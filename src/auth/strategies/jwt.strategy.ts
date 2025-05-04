import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common'; // Exceção personalizada

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || "", // Se a chave não for encontrada no .env, use um valor padrão (caso necessário)
    });
  }

  async validate(payload: { sub: string }): Promise<User> {
    // Validação do payload para garantir que ele tenha a propriedade `sub`
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Token inválido');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub }, // Busca o usuário pelo id
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user; // O usuário será atribuído à req.user
  }
}
