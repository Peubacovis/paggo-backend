import { Injectable } from '@nestjs/common';
import { OcrService } from '../ocr/ocr.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly ocrService: OcrService) {}

  async processDocument(file: Express.Multer.File): Promise<string> {
    const text = await this.ocrService.extractTextFromBuffer(file.buffer);
    return text;
  }
}

