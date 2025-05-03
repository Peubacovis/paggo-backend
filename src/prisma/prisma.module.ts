import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Opcional: torna o serviço disponível globalmente
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporte o serviço
})
export class PrismaModule {}