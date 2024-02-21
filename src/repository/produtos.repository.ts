import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutosRepository {
  private produtos = [];
  async salvar(produto) {
    this.produtos.push(produto);
  }
  async listar() {
    console.log(this.produtos);
    return this.produtos;
  }
}
