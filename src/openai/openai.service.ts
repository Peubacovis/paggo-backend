import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Certifique-se de definir no seu .env
    });
  }

  async ask(prompt: string): Promise<string> {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente que explica informações extraídas de documentos de forma clara e útil.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      });

      const answer = chatCompletion.choices[0]?.message?.content;

      if (!answer) {
        throw new InternalServerErrorException('Resposta da IA veio vazia.');
      }

      return answer.trim();
    } catch (error) {
      console.error('Erro ao chamar OpenAI:', error);
      throw new InternalServerErrorException('Erro ao buscar resposta da IA');
    }
  }
}
