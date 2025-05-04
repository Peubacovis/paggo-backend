// src/llm/llm.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('ask')
  async explain(@Body('text') text: string) {
    return this.llmService.explainText(text);
  }
}
