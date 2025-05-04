import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as path from 'path';

describe('DocumentsController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Se você usa validações globais
    await app.init();

    // Gere ou insira manualmente um token JWT válido (ajuste conforme necessário)
    jwtToken = 'SUA_JWT_AQUI';
  });

  it('should upload a file', async () => {
    const testFilePath = path.join(__dirname, 'test.pdf'); // Coloque um arquivo real nesse caminho

    const res = await request(app.getHttpServer())
      .post('/documents/upload')
      .set('Authorization', `Bearer ${jwtToken}`)
      .attach('file', testFilePath)
      .expect(201); // ou 200, dependendo da sua implementação

    console.log(res.body);
  });
});
