import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IMessage } from 'src/app/shared/interfaces/message';
import { AzureBlobStorageService } from 'src/app/shared/services/azure-blob-storage.service';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { AuthService } from '../auth.service';
import { AZURE_SAS_TOKEN } from 'src/app/shared/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profilePicUrl: string | undefined;
  showEditMode = false;
  formSubmited = false;
  messages: IMessage[] = [];

  get user() {
    const { username, email, _id } = this.authService.user!;
    return {_id, username, email};
  }

  form = this.fb.group({
    _id: [''],
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, appEmailValidator()]]
  });

  constructor(private authService: AuthService, private fb: FormBuilder, private blobService: AzureBlobStorageService ) {
    this.profilePicUrl = this.authService.user?.profilePictureUrl;
    this.form.setValue({...this.user});
    this.getMessages();
  }

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;

    if (this.showEditMode) {
      this.formSubmited = true;
    }
  }

  saveNewInfo(): void {
    this.formSubmited = false;

    if (this.form.invalid) { return; }

    const { username, email } = this.form.value;
    this.authService.user = {
      username,
      email
    } as any;

    this.toggleEditMode();
  }

  getMessages() {
    this.authService.getMessages().subscribe({
      next: (value) => {
        this.messages = value.filter(x => x.userId == this.user._id);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteMessage(id: string) {
    this.authService.deleteMessage(id).subscribe({
      next: () => {
        console.log('Message deleted!');
        const message = this.messages.find(x => x._id == id);
        const index = this.messages.indexOf(message!);
        this.messages.splice(index, 1);
        this.messages = [...this.messages];
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  uploadProfileImage(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0] as File;
    this.blobService.uploadImageAndGetUrlImage(AZURE_SAS_TOKEN, file, file.name, () => {
      this.profilePicUrl = this.blobService.uploadedImageUrl;
      this.saveImgUrlToDb();
    })
  }

  saveImgUrlToDb() {
    this.authService.saveProfileImageUrl(this.profilePicUrl!).subscribe(() => {
      console.log('Image saved!');
    })
  }
}
