import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario.module';

@Module({
  imports: [UsuarioModule],
})
export class AppModule {}
