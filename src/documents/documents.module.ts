import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; 
import { OcrModule } from '../ocr/ocr.module';


@Module({
  imports: [AuthModule, OcrModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService],
})
export class DocumentsModule {}
