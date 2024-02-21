import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from 'src/entities/usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: Array<UsuarioEntity> = [];

  async salvar(usuario: UsuarioEntity): Promise<void> {
    this.usuarios.push(usuario);
  }

  async listar(): Promise<Array<UsuarioEntity>> {
    return this.usuarios;
  }
  async atualizar(
    id: string,
    dadosDeAtualizacao: Partial<UsuarioEntity>,
  ): Promise<Partial<UsuarioEntity>> {
    const possivelUsuario = this.buscarUsuario(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      possivelUsuario[chave] = valor;
    });
    return possivelUsuario;
  }
  async deletar(id: string): Promise<UsuarioEntity> {
    const usuario = this.buscarUsuario(id);
    if (usuario) {
      this.usuarios = this.usuarios.filter(
        (usuarioSalvo) => usuarioSalvo.id !== id,
      );
    }
    return usuario;
  }

  private buscarUsuario(id) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );

    if (!possivelUsuario) {
      throw new Error('Usuário não encontrado');
    }
    return possivelUsuario;
  }

  async existeComEmail(email: string): Promise<boolean> {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }
}
