# medusa-file-cloudinary

![NPM](https://nodei.co/npm/medusa-file-cloudinary.png?downloads=true&downloadRank=true&stars=true)

## Upload files to Cloudinary in [Medusa Commerce](https://www.medusajs.com/)

## Options

```txt
cloud_name: [cloudinary cloud name],
api_key: [cloudinary api key],
api_secret: [cloudinary api secret],
secure: [enable secure uploads, default true],
root_folder: [folder name to upload the files],
use_file_name_as_path: [use filename to generate path]
  // a.b.c.jpeg → a/b/c in cloudinary, default false
uploadOptions: [Object passed to upload_stream while uploading, default {}]
  // folder, public_id are passed, uploadOptions will override internal behaviour
  // for root_folder & public_id's generation using use_file_name_as_path
```

## Usage

First, install the plugin using your preferred package manager:

```sh
yarn add medusa-file-cloudinary
```

Then configure your `medusa-config.js` to include the plugin alongside the required options:

```js
{
  resolve: `medusa-file-cloudinary`,
  options: {
    cloud_name: "YOUR_CLOUD_NAME",
    api_key: "YOUR_API_KEY",
    api_secret: "YOUR_API_SECRET",
    secure: true,
    root_folder: 'FOLDER',
    use_file_name_as_path: boolean // default value false
    uploadOptions: {} // if folder and public_id are passed here, they will override internal behaviour for root_folder & public_id generation
  },
},
```

You can find the above options in Cloudinary dashboard.

> Make sure to use an environment variable for the api key and secret in a live environment.

### Try it out

Finally, run your Medusa server alongside our admin system to try out your new file service. Upon editing or creating products, you can now upload thumbnails and images, that are stored in Cloudinary.
