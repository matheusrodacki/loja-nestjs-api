import { Module } from '@nestjs/common';
import { ProdutosController } from 'src/controllers/produtos.controller';
import { ProdutosRepository } from 'src/repository/produtos.repository';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosRepository],
})
export class ProdutoModule {}
