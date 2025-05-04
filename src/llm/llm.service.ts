// src/llm/llm.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class LlmService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async explainText(text: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente que explica textos de documentos.',
          },
          {
            role: 'user',
            content: `Explique esse texto: ${text}`,
          },
        ],
        max_tokens: 800, // Define um limite para evitar estouros
      });

      return { explanation: completion.choices[0].message.content };
    } catch (error) {
      console.error('Erro ao chamar o OpenAI:', error);
      throw new Error('Erro ao gerar explicação do texto');
    }
  }
}
