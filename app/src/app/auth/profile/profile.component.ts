import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MovieService } from 'src/app/movie/movie.service';
import { IMessage } from 'src/app/shared/interfaces/message';
import { AzureBlobStorageService } from 'src/app/shared/services/azure-blob-storage.service';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { AuthService } from '../auth.service';
import { AZURE_SAS_TOKEN } from 'src/app/shared/constants';
import { urlInterceptorProvider } from 'src/app/interceptors/url.interceptor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  picturesList: string[] = [];
  lastPictureUrl!: string;
  isPictureLoaded = false;

  showEditMode = false;
  formSubmited = false;

  messages: IMessage[] = [];
  userId!: string;

  get user() {
    const { username, email, _id } = this.authService.user!;

    this.userId = _id;

    return {
      username,
      email
    };
  }

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, appEmailValidator()]]
  });

  constructor(private authService: AuthService, private fb: FormBuilder, private blobService: AzureBlobStorageService ) {
    this.form.setValue({...this.user});
    this.getMessages();
  }
  ngOnInit(): void {
    this.reloadImagesList();
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
        this.messages = value.filter(x => x.userId == this.userId);
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

  uploadImageAndGetImageUrl(event: Event) {
    Promise.all([this.imageSelected(event), this.getLastImageUrl()])
      .then(() => {
        console.log('IMAGE UPLOADED');
      })
  }

  imageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0] as File;
    this.blobService.uploadImage(AZURE_SAS_TOKEN, file, file.name, () => {
      this.reloadImagesList();
    })
  }

  reloadImagesList() {
    this.blobService.listImages().then(list => {
      this.picturesList = list;
    })
  }

  getLastImageUrl() {
    const lastPictureName = this.picturesList[0];
    this.blobService.downloadImage(lastPictureName, blob => {
      this.lastPictureUrl = window.URL.createObjectURL(blob);
      this.isPictureLoaded = true;
    })
  }

  saveImgUrlToDb() {
    this.authService.saveProfileImageUrl(this.lastPictureUrl).subscribe((user) => {
      this.isPictureLoaded = false;
      console.log(user);
    })
  }
}
