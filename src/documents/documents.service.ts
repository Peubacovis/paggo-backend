import * as fs from 'fs'; // Importando o módulo fs
import * as path from 'path'; // Importando o módulo path
import * as Tesseract from 'tesseract.js'; // Importando o Tesseract.js
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

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
        ocrText: extractedText, // Armazena o texto extraído no campo ocrText
      },
    });

    return document;
  }

  // Método privado para extrair texto da imagem usando Tesseract.js
  private async extractTextFromImage(imagePath: string): Promise<string> {
    try {
      // Usando o Tesseract.js para extrair texto da imagem
      const { data } = await Tesseract.recognize(
        imagePath,
        'eng', // Linguagem do OCR, você pode mudar para 'por' para português
        {
          logger: (m) => console.log(m), // Para ver o progresso
        }
      );
      return data.text; // Retorna o texto extraído da imagem
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
  

}
