// src/llm/llm.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('explain')
  async explain(@Body('text') text: string) {
    const explanation = await this.llmService.explainText(text);
    return { explanation };
  }
}
