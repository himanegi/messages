import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { createMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { AuthGuard, RoleGuard, Roles } from 'nest-keycloak-connect';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  // @Roles({ roles: ['no'] })
  listMessages() {
    return this.messagesService.findAll();
  }
  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles({ roles: ['message_creator'] })
  createMessage(@Body() body: createMessageDto) {
    return this.messagesService.create(body.content);
  }
  @Get(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles({ roles: ['message_reader'] })
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) throw new NotFoundException('message not found!');
    return message;
  }
}
