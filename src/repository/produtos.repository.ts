import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from 'src/entities/produto.entity';

@Injectable()
export class ProdutosRepository {
  private produtos: Array<ProdutoEntity> = [];

  async salvar(produto: ProdutoEntity): Promise<void> {
    this.produtos.push(produto);
  }

  async listar(): Promise<Array<ProdutoEntity>> {
    return this.produtos;
  }

  async atualizar(
    id: string,
    dadosDeAtualizacao: Partial<ProdutoEntity>,
  ): Promise<ProdutoEntity> {
    const naoAtualizaveis = [['id', 'usuarioId']];
    const produto = this.buscarProduto(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (naoAtualizaveis.includes([chave])) {
        return;
      }
      produto[chave] = valor;
    });
    return produto;
  }

  private buscarProduto(id: string): ProdutoEntity {
    const possivelProduto = this.produtos.find((produto) => produto.id === id);

    if (!possivelProduto) {
      throw new Error('Produto não existe');
    }

    return possivelProduto;
  }
}
