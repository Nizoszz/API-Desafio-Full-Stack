import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common/interfaces/middleware';
import { NextFunction, Request, Response } from 'express';
import { ClientsService } from 'src/modules/clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { ContactsService } from 'src/modules/contacts/contacts.service';

@Injectable()
export class ClientIdEnsureExistMiddleware implements NestMiddleware {
  constructor(
    private clientService: ClientsService,
    private contactService: ContactsService,
    private jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const clientId = req.body.clientId;
    const idParams = req.params.id;
    const token = req.headers.authorization;
    const decodeToken = this.jwtService.decode(token.slice(7));
    if (req.method === 'POST') {
      const ensureClient = await this.clientService.findOne(
        clientId,
        decodeToken.sub,
      );
      if (!ensureClient) {
        throw new NotFoundException('Client not found');
      }
    }

    if (req.method === 'PATCH' || req.method === 'DELETE') {
      const ensureContact = await this.contactService.findOne(idParams);
      const ensureClient = await this.clientService.findOne(
        ensureContact.clientId,
        decodeToken.sub,
      );
      if (ensureClient.id !== ensureContact.clientId) {
        throw new UnauthorizedException('has permission been denied');
      }
    }

    next();
  }
}
