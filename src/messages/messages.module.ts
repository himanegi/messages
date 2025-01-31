import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import {
  // AuthGuard,
  KeycloakConnectModule,
  // ResourceGuard,
  // RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakConfigService } from '../keycloak-config.service';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useClass: KeycloakConfigService,
    }),
  ],
  controllers: [MessagesController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ResourceGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
    MessagesService,
    MessagesRepository,
  ],
})
export class MessagesModule {}
