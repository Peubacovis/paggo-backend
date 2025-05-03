import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { DocumentsService } from './documents.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('documents')
@UseGuards(AuthGuard('jwt')) // ✅ Aqui
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const text = await this.documentsService.processDocument(file);
    return { text };
  }
  
}
