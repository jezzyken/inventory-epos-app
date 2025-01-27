const cloudinary = require('../config/cloudinary');

const uploadImage = async (file, folder = 'products') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      use_filename: true,
      unique_filename: true
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary');
  }
};

module.exports = { uploadImage };