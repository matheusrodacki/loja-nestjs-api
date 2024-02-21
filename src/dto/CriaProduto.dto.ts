import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CaracteristicaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}

export class ImagemProdutoDTO {
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}

export class CriaProdutoDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  valor: number;

  @IsNumber()
  @Min(0)
  quantidadeDisponivel: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  descricao: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @IsArray()
  @ValidateNested()
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsDateString()
  dataCriacao: Date;

  @IsDateString()
  dataAtualizacao: Date;
}
