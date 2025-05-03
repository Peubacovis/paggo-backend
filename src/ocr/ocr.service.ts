import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class OcrService {
  async extractTextFromBuffer(buffer: Buffer): Promise<string> {
    const worker = await createWorker();

    try {
      await worker.load();
      await worker.load('eng+por');
      await worker.reinitialize('eng+por');

      const {
        data: { text },
      } = await worker.recognize(buffer);

      await worker.terminate();
      return text;
    } catch (error) {
      await worker.terminate();
      throw new Error(`OCR error: ${error}`);
    }
  }
}
