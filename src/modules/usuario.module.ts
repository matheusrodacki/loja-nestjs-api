import { Module } from '@nestjs/common';
import { UsuarioController } from 'src/controllers/usuario.controller';
import { UsuarioRepository } from 'src/repository/usuario.repository';
import { EmailUnicoValidator } from 'src/validation/email-unico.validator';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository, EmailUnicoValidator],
})
export class UsuarioModule {}
