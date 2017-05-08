import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
declare let Aviary: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private imgURL;
  constructor(
    public navCtrl: NavController,
    private filePlugin: File,
    private imagePickerPlugin: ImagePicker
  ) {

  }

  onImageSelect(event: any): void {
    let that = this;

    // Set image picker options.
    let options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
      quality: 95
    }

    // Call image picker plugin.
    this.imagePickerPlugin.getPictures(options)
      .then((mediaFileUrls: Array<any>) => {

        // Get selected media count.
        let fileLen = mediaFileUrls.length;
        let files: Array<ImageModel>;
        if (fileLen > 0) {
          files = new Array<ImageModel>();

          // Iterate selected media urls.
          mediaFileUrls.forEach((fileURI: any, index: number) => {

            let tools = Aviary.Tools;

            Aviary.show({
              imageURI: fileURI,
              outputFormat: Aviary.OutputFormat.JPEG,
              quality: 90,
              toolList: [
                tools.CROP, tools.ENHANCE, tools.EFFECTS
              ],
              hideExitUnsaveConfirmation: false,
              enableEffectsPacks: true,
              enableFramesPacks: true,
              enableStickersPacks: true,
              disableVibration: false,
              folderName: "MyApp",
              success: function (result) {
                let editedImageFileName = result.name;
                let editedImageURI = result.src;
                that.imgURL = editedImageURI;
                alert("File name: " + editedImageFileName + ", Image URI: " + editedImageURI);
              },
              error: function (message) {
                alert(message);
              }
            });

            // // Get media's full path.
            // let fullPath = UIUtil.getFullPath(fileUrl);

            // // Get media file name.
            // let fileName = UIUtil.getFileName(fileUrl);
            // let BASE_64_PREFIX = "base64,";

            // // Read media as data url.
            // that.file.readAsDataURL(fullPath, fileName)
            //   .then(base64 => {
            //     let image = new ImageModel();
            //     image.fileName = fileName;
            //     image.base64 = base64.substring(base64.indexOf(BASE_64_PREFIX) + BASE_64_PREFIX.length);
            //     files.push(image);

            //     if (index == fileLen - 1) {
            //       if (handler && that.isFunctionType(handler)) {
            //         handler(files);
            //       }
            //     }
            //   })
            //   .catch(error => {
            //     if (errorHandler && that.isFunctionType(errorHandler)) {
            //       errorHandler();
            //     }
            //   });
          });
        }
      });
  }
}

export class MediaCoreModel {
  // Common attributes
  public mediaId: any;
  public blobId: any;
  public fileName: string;
  public caption: string;
  public type: string;
  public format: string;
  public encoding: string;
  public aspectRatio: any;
  public size: number;
  public downloadURL: string;
  public data: any;

  public createdByUserId: string;
  public createdByName: string;
  public createdOn: Date;
  public modifiedByUserId: string;
  public modifiedByName: string;
  public modifiedOn: Date;
}

export class CollectionCoreModel {
  public storageId: any;
  public name: string;
  public caption: string;
  public type: string;
  public format: string;
  public size: number;

  public createdByUserId: string;
  public createdByName: string;
  public createdOn: Date;
  public modifiedByUserId: string;
  public modifiedByName: string;
  public modifiedOn: Date;
}

export class ImageAlbumModel extends CollectionCoreModel {
  public images: Array<ImageModel>; //array of images

}

export class ImageModel extends MediaCoreModel {
  public base64: string;
  public height: number;
  public width: number;
  public thumbnailId: any;
  public collections: ImageAlbumModel;
}