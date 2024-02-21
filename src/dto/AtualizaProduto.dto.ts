import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from './CriaProduto.dto';

export class AtualizaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  @IsOptional()
  usuarioId: string;

  @IsString()
  @IsOptional()
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  @IsOptional()
  valor: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantidadeDisponivel: number;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  descricao: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];

  @IsArray()
  @ValidateNested()
  @Type(() => ImagemProdutoDTO)
  @IsOptional()
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsOptional()
  categoria: string;

  @IsDateString()
  @IsOptional()
  dataCriacao: Date;

  @IsDateString()
  @IsOptional()
  dataAtualizacao: Date;
}
