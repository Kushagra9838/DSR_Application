import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class S3Service {
 

  async uploadFile(file: Express.Multer.File): Promise<string> {
    
  }
}
