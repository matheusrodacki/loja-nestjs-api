import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from 'src/repository/usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() payloadUsuario) {
    this.usuarioRepository.salvar(payloadUsuario);
    return payloadUsuario;
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listar();
  }
}
