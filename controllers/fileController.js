import cloudinary from '../config/cloudinary.js';

export const uploadFile = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({
      url: result.secure_url,
      size: req.file.size,
      type: req.file.mimetype,
    });
  } catch (err) {
    next(err);
  }
};
