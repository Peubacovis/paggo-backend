import * as fs from 'fs';
import * as path from 'path';
import * as Tesseract from 'tesseract.js';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpenAI } from 'openai';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('OPENAI_API') private readonly openai: OpenAI, // <- Injeção do OpenAI
  ) {}

  // Processa o upload do documento e realiza OCR na imagem
  async processUpload(userId: string, file: Express.Multer.File) {
    const userFolderPath = path.join(process.cwd(), 'uploads', userId.toString());
    
    // Cria a pasta do usuário se não existir
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    // Define o caminho completo para salvar a imagem
    const filePath = path.join(userFolderPath, file.originalname);

    // Salva a imagem enviada no diretório do usuário
    fs.writeFileSync(filePath, file.buffer);

    // Agora, vamos usar o Tesseract.js para extrair o texto da imagem
    const extractedText = await this.extractTextFromImage(filePath);

    // Cria o documento no banco de dados com o texto extraído
    const document = await this.prisma.document.create({
      data: {
        userId,
        filename: file.originalname,
        ocrText: extractedText,
      },
    });

    return document;
  }

  // Método privado para extrair texto da imagem usando Tesseract.js
  private async extractTextFromImage(imagePath: string): Promise<string> {
    try {
      const { data } = await Tesseract.recognize(imagePath, 'eng', {
        logger: (m) => console.log(m),
      });
      return data.text;
    } catch (error) {
      console.error('Erro ao processar a imagem:', error);
      throw new Error('Erro ao extrair texto da imagem');
    }
  }

  // Método para buscar documentos de um usuário
  async getDocuments(userId: string) {
    try {
      const documents = await this.prisma.document.findMany({
        where: { userId },
      });
      return documents;
    } catch (error) {
      throw new Error('Erro ao buscar documentos');
    }
  }

  async findByFilename(userId: string, filename: string) {
    return this.prisma.document.findFirst({
      where: {
        userId,
        filename,
      },
    });
  }

  async findDocumentByFilenameAndUserId(filename: string, userId: string) {
    return await this.prisma.document.findFirst({
      where: {
        userId: userId,
        filename: filename,
      },
    });
  }

  // 🔥 NOVO MÉTODO: Explicar documento com base no texto extraído
  async explainDocument(text: string): Promise<string> {
    try {
      // Verificando se o texto está vazio ou malformado
      if (!text || typeof text !== 'string' || text.trim().length === 0) {
        throw new BadRequestException('Texto inválido ou vazio');
      }

      console.log('Prompt enviado:', text);

      // Chamando a OpenAI para explicar o texto
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // ou 'gpt-3.5-turbo'
        messages: [
          { role: 'system', content: 'Você é um assistente inteligente.' },
          { role: 'user', content: `Explique esse texto: ${text}` },
        ],
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content ?? 'Não foi possível gerar a explicação.';
    } catch (error) {
      console.error('Erro detalhado:', JSON.stringify(error, null, 2));
      throw new BadRequestException('Erro ao gerar explicação com a OpenAI');
    }
  }
}
