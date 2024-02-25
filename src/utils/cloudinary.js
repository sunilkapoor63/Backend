import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPathFile) => {
  try {
    if (!localPathFile) return null;
    const responce = await cloudinary.uploader.upload(localPathFile, {
      resource_type: "auto",
    });
    // console.log("file uploaded successfully on cloudinary", responce.url);
    // fs.unlinkSync(localPathFile)
    // await fs.unlink(localPathFile);
    return responce;
  } catch (error) {
    fs.unlinkSync(localPathFile); // remove the localy saved temporary file as the upload operation got failed
  }
};

// cloudinary.v2.uploader.upload
uploadOnCloudinary(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);

export { uploadOnCloudinary };
