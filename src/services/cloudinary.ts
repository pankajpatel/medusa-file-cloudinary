import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { FileService } from "medusa-interfaces";

class CloudinaryService extends FileService {
  private nameToPath_: boolean;
  private root_: string;
  private uploadOptions_: UploadApiOptions;
  private nonPublicIdSlashCount_: number;

  constructor({}, options) {
    super();

    this.root_ = options.root_folder;
    this.uploadOptions_ = options.uploadOptions || {};
    this.nameToPath_ = options.use_file_name_as_path || false;
    this.nonPublicIdSlashCount_ = 7;

    cloudinary.config({
      cloud_name: options.cloud_name,
      api_key: options.api_key,
      api_secret: options.api_secret,
      secure: options.secure || true,
    });
  }

  // File upload
  // @ts-ignore FileService interface says upload: () => void which doesn't align with needed implementation
  upload(file) {
    const publicId = this.buildPublicId(file.originalname);
    const { public_id, ...rest } = this.uploadOptions_;
    const options = {
      folder: this.root_,
      public_id: public_id || publicId,
      resource_type: this.getResourceType(file),
      ...rest,
    };

    return cloudinary.uploader.upload(file.path, options);
  }

  // @ts-ignore FileService interface says delete: () => void which doesn't align with needed implementation
  delete(file: string) {
    // file is the url of image. We have to extract the public id from url
    const publicId =
      typeof file === "string" && file.toLowerCase().match("cloudinary")
        ? this.extractPublicId(file)
        : file;
    return cloudinary.uploader.destroy(publicId);
  }

  /* ------------------------------ helper methods ------------------------------ */

  getResourceType(file) {
    if (file.mimetype.startsWith("image/")) {
      return "image";
    }

    if (file.mimetype.startsWith("video/")) {
      return "video";
    }

    return "auto";
  }

  buildPublicId(originalFileName) {
    const fileName = this.removeExtension(originalFileName);
    const cleanFileName = fileName.replace(/\s+/g, "-"); // convert ' ' to '-'

    const filePath = this.nameToPath_
      ? cleanFileName.split(".").join("/")
      : cleanFileName;

    const uniqueSuffix = Date.now();
    return `${filePath}_${uniqueSuffix}`;
  }

  extractPublicId(url) {
    // example: https://res.cloudinary.com/<cloud_name>/image/upload/v1676396191/store/file-name_1676396190050.png
    const cUrl = this.removeExtension(url);
    return cUrl.split("/").slice(this.nonPublicIdSlashCount_).join("/");
  }

  removeExtension(name) {
    return name.split(".").slice(0, -1).join(".");
  }
}

export default CloudinaryService;
