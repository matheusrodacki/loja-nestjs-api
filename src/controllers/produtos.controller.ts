import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AtualizaProdutoDTO } from 'src/dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from 'src/dto/CriaProduto.dto';
import { ProdutoEntity } from 'src/entities/produto.entity';
import { ProdutosRepository } from 'src/repository/produtos.repository';
import { v4 as uuid } from 'uuid';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosRepository: ProdutosRepository) {}

  @Get()
  async listaProdutos() {
    return this.produtosRepository.listar();
  }

  @Post()
  async criaProduto(@Body() payloadProdutos: CriaProdutoDTO): Promise<object> {
    const produtosEntity = new ProdutoEntity();

    produtosEntity.id = uuid();
    produtosEntity.usuarioId = payloadProdutos.usuarioId;
    produtosEntity.nome = payloadProdutos.nome;
    produtosEntity.valor = payloadProdutos.valor;
    produtosEntity.quantidadeDisponivel = payloadProdutos.quantidadeDisponivel;
    produtosEntity.descricao = payloadProdutos.descricao;
    produtosEntity.caracteristicas = payloadProdutos.caracteristicas;
    produtosEntity.imagens = payloadProdutos.imagens;
    produtosEntity.categoria = payloadProdutos.categoria;
    produtosEntity.dataCriacao = payloadProdutos.dataCriacao;
    produtosEntity.dataAtualizacao = payloadProdutos.dataAtualizacao;

    this.produtosRepository.salvar(produtosEntity);
    return {
      produto: produtosEntity,
      message: 'Produto cadastrado com sucesso!',
    };
  }

  @Put('/:id')
  async atualizaProduto(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    try {
      const produtoAtualizado = await this.produtosRepository.atualizar(
        id,
        dadosProduto,
      );

      return {
        produto: produtoAtualizado,
        message: 'Produto atualizado com sucesso!',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}
