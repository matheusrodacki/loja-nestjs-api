import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { EmailEhUnico } from 'src/validation/email-unico.validator';

export class AtualizaUsuarioDTO {
  @IsString({ message: 'O nome tem que ser uma string' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'Informe um email válido.' })
  @EmailEhUnico({ message: 'Email já cadastrado' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Informe um email válido.' })
  @IsOptional()
  senha: string;
}
