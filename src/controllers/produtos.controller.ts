import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutosRepository } from 'src/repository/produtos.repository';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosRepository: ProdutosRepository) {}

  @Get()
  async listaProdutos() {
    return this.produtosRepository.listar();
  }

  @Post()
  async criaProduto(@Body() payloadProdutos) {
    this.produtosRepository.salvar(payloadProdutos);
    return payloadProdutos;
  }
}
