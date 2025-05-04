import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Importando o ConfigModule
import { LlmModule } from './llm/llm.module'; // Supondo que você tenha um módulo para LLM
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    DocumentsModule,
    AuthModule,
    PrismaModule,
    // Configuração para carregar o .env e disponibilizar variáveis de ambiente globalmente
    ConfigModule.forRoot({
      isGlobal: true, // Isso garante que as variáveis de ambiente estejam disponíveis em todo o app
      envFilePath: '.env', // Caminho do arquivo .env (opcional, caso o arquivo esteja em outro lugar)
    }),
    LlmModule, // Seu módulo LLM
    // Outros módulos que você tenha, por exemplo, AuthModule, etc.
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
