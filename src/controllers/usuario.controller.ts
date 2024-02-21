import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriaUsuarioDTO } from 'src/dto/CriaUsuario.dto';
import { UsuarioRepository } from 'src/repository/usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listar();
  }

  @Post()
  async criaUsuario(@Body() payloadUsuario: CriaUsuarioDTO) {
    this.usuarioRepository.salvar(payloadUsuario);
    return payloadUsuario;
  }
}
