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
  async existeComEmail(email: string): Promise<boolean> {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }
}
