import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpenaiModule } from 'src/openai/openai.module'; // Importe o OpenaiModule aqui

@Module({
  imports: [OpenaiModule, PrismaModule, UsersModule, JwtModule.register({})],
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService],
  exports: [DocumentsService]
})
export class DocumentsModule {}
