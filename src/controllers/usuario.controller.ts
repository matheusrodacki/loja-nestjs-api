import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriaUsuarioDTO } from 'src/dto/CriaUsuario.dto';
import { listaUsuarioDTO } from 'src/dto/ListaUsuario.dto';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { UsuarioRepository } from 'src/repository/usuario.repository';
import { v4 as uuid } from 'uuid';
@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new listaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }

  @Post()
  async criaUsuario(@Body() payloadUsuario: CriaUsuarioDTO): Promise<object> {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.email = payloadUsuario.email;
    usuarioEntity.nome = payloadUsuario.nome;
    usuarioEntity.senha = payloadUsuario.senha;
    usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);

    return {
      usuario: new listaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuario criado com sucesso',
    };
  }
}
