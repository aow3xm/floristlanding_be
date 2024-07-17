import { BadRequestException, Injectable } from '@nestjs/common';
import { extname, join, resolve } from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File, folder: string = '') {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      const uploadPath = resolve(process.cwd(), 'public', folder);
      const fileName =
        file.filename || `${Date.now()}${extname(file.originalname)}`;
      const filePath = join(uploadPath, fileName);

      await fs.promises.mkdir(uploadPath, { recursive: true });

      if (file.buffer) {
        await fs.promises.writeFile(filePath, file.buffer);
      } else if (file.path && fs.existsSync(file.path)) {
        await fs.promises.copyFile(file.path, filePath);
      } else {
        throw new BadRequestException('Source file not found');
      }

      const publicPath = join(folder, fileName).replace(/\\/g, '/');

      return {
        originalname: file.originalname,
        filename: fileName,
        path: `${publicPath}`,
        folder: folder,
      };
    } catch (error) {
      throw new BadRequestException(`Error processing file: ${error.message}`);
    }
  }
}
