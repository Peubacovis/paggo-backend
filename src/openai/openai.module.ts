import { Module } from '@nestjs/common';
import { OpenAI } from 'openai';

@Module({
  providers: [
    {
      provide: 'OPENAI_API',
      useFactory: () => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          throw new Error('A chave da API da OpenAI (OPENAI_API_KEY) não está definida nas variáveis de ambiente.');
        }

        console.log('🔑 OpenAI API Key carregada:', apiKey); // <- Aqui

        return new OpenAI({
          apiKey,
        });
      },
    },
  ],
  exports: ['OPENAI_API'],
})
export class OpenaiModule {}
