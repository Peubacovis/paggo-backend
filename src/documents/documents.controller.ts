import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
  Res,
  NotFoundException,
  Req,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocumentsService } from './documents.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response, Request } from 'express';
import { UsersService } from '../users/users.service';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@ApiTags('documents')
@ApiBearerAuth()
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getDocuments(@Req() req: Request) {
    const user = req.user as { id: string; email: string };

    if (!user?.email) {
      throw new BadRequestException('Email não encontrado no token');
    }

    const foundUser = await this.usersService.findByEmail(user.email);

    if (!foundUser) {
      throw new BadRequestException('Usuário não encontrado');
    }

    try {
      const documents = await this.documentsService.getDocuments(foundUser.id);
      return {
        success: true,
        message: 'Documentos encontrados com sucesso',
        data: documents,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Erro ao recuperar documentos');
    }
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as { id: string; email: string };

    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    if (!user?.email) {
      throw new BadRequestException('Email não encontrado no token');
    }

    const foundUser = await this.usersService.findByEmail(user.email);

    if (!foundUser) {
      throw new BadRequestException('Usuário não encontrado');
    }

    try {
      const document = await this.documentsService.processUpload(foundUser.id, file);
      return {
        success: true,
        message: 'Documento enviado com sucesso',
        data: document,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Erro ao enviar o documento');
    }
  }

  @Get('download-text/:filename')
  @UseGuards(JwtAuthGuard)
  async downloadText(
    @Param('filename') filename: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const user = req.user as { id: string };

    if (!user || !user.id) {
      throw new BadRequestException('ID do usuário não encontrado no token');
    }

    const document = await this.documentsService.findDocumentByFilenameAndUserId(filename, user.id);

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    const extractedText = document.ocrText;

    if (!extractedText) {
      throw new NotFoundException('Texto extraído não encontrado');
    }

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.txt`);
    res.send(extractedText);
  }

  // Nova rota para explicar o conteúdo do documento
  @Post('explain')
  @UseGuards(JwtAuthGuard)
  async explainDocument(@Body('text') text: string) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      throw new BadRequestException('Texto inválido ou vazio');
    }
    try {
      const explanation = await this.documentsService.explainDocument(text);
      return {
        success: true,
        message: 'Explicação gerada com sucesso',
        data: explanation,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Erro ao gerar explicação');
    }
  }
}
