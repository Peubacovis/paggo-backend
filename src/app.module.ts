import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    AuthModule, // Deve estar presente
    DocumentsModule,
  ],
})
export class AppModule {}