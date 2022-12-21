import { Component, OnInit } from '@angular/core';
import { AzureBlobStorageService } from 'src/app/shared/services/azure-blob-storage.service';
import { AZURE_SAS_TOKEN } from 'src/app/shared/constants';

@Component({
  selector: 'app-test-image-upload',
  templateUrl: './test-image-upload.component.html',
  styleUrls: ['./test-image-upload.component.scss']
})
export class TestImageUploadComponent implements OnInit {
  picturesList: string[] = [];
  lastImageUrl!: string;

  constructor(private blobService: AzureBlobStorageService) { }

  ngOnInit(): void {
    this.reloadImagesList();
  }

  public imageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0] as File;
    this.blobService.uploadImage(AZURE_SAS_TOKEN, file, file.name, () => {
      this.reloadImagesList();
    })
  }

  public deleteImage(name: string) {
    this.blobService.deleteImage(AZURE_SAS_TOKEN, name, () => {
      this.reloadImagesList();
    });
  };

  private reloadImagesList() {
    this.blobService.listImages().then(list => {
      this.picturesList = list;
    })
  }

  public downloadImage(name: string) {
    this.blobService.downloadImage(name, blob => {
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  getLastImageUrl(): string {
    let lastPictureUrl = '';
    const lastPictureName = this.picturesList[this.picturesList.length - 1];
    this.blobService.downloadImage(lastPictureName, blob => {
      let url = window.URL.createObjectURL(blob);
      lastPictureUrl = url;
    })
    return lastPictureUrl;
  }
}
