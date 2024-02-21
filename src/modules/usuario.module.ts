import { Module } from '@nestjs/common';
import { UsuarioController } from 'src/controllers/usuario.controller';
import { UsuarioRepository } from 'src/repository/usuario.repository';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository],
})
export class UsuarioModule {}
