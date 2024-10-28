import { v2 as cloudinary } from 'cloudinary'

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export default cloudinary