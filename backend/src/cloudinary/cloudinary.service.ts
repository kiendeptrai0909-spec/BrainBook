import { Injectable, BadRequestException } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuid } from 'uuid'

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  // ✅ Upload từ file (QUAN TRỌNG NHẤT)
  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded')

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'books',
            public_id: `book-${uuid()}`, // tránh trùng
          },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          },
        )
        .end(file.buffer)
    })
  }

  // (Optional) dùng khi seed data
  async uploadFromUrl(url: string) {
    return cloudinary.uploader.upload(url, {
      folder: 'books',
      public_id: `book-${uuid()}`,
    })
  }

  // Tối ưu ảnh
  getOptimizeUrl(publicId: string) {
    return cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
    })
  }

  // Crop ảnh
  getAutoCropUrl(publicId: string) {
    return cloudinary.url(publicId, {
      crop: 'fill',
      gravity: 'auto',
      width: 300,
      height: 400,
    })
  }
}