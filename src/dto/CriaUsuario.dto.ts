import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailEhUnico } from 'src/validation/email-unico.validator';

export class CriaUsuarioDTO {
  @IsString({ message: 'O nome tem que ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'Informe um email válido.' })
  @EmailEhUnico({ message: 'Usuario já cadastrado!' })
  email: string;

  @MinLength(6, { message: 'Informe um email válido.' })
  senha: string;
}
