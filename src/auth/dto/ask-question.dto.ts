import { IsString } from 'class-validator';

export class AskQuestionDto {
  @IsString()
  question: string;
}
