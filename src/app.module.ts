import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './modules/clients/clients.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientIdEnsureExistMiddleware } from './middleware/clientId-ensure-exists.middleware';
import { ContactsController } from './modules/contacts/contacts.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ClientsModule, ContactsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientIdEnsureExistMiddleware).forRoutes(ContactsController);
  }
}
