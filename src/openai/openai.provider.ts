import { OpenAI } from 'openai';
import { Provider } from '@nestjs/common';

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);
export const OPENAI_API = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const OpenAIProvider: Provider = {
  provide: 'OPENAI_API',
  useValue: OPENAI_API,
};
