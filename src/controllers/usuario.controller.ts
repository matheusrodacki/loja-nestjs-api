import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizaUsuarioDTO } from 'src/dto/AtualizaUsuario.dto';
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

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    try {
      const usuarioAtualizado = await this.usuarioRepository.atualizar(
        id,
        novosDados,
      );

      return {
        usuario: usuarioAtualizado,
        message: 'Usuário atualizado com sucesso!',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Delete('/:id')
  async deletaUsuario(@Param('id') id: string) {
    try {
      const usuarioRemovido = await this.usuarioRepository.deletar(id);

      return {
        usuario: usuarioRemovido,
        message: 'Usuário deletado com sucesso!',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}
