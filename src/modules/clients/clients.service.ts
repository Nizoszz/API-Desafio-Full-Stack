import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(private clientsRepository: ClientsRepository) {}
  async create(data: CreateClientDto, userId: string) {
    const findClient = await this.clientsRepository.findByEmail(data.email);
    if (findClient) {
      throw new ConflictException('E-mail already exists!');
    }

    const client = await this.clientsRepository.create(data, userId);

    return client;
  }

  async findAll(userId: string) {
    const clients = await this.clientsRepository.findAll(userId);
    return clients;
  }

  async findOne(id: string, userId: string) {
    const findCLient = await this.clientsRepository.findOne(id);
    if (!findCLient) {
      throw new NotFoundException('Client not found');
    }
    if (findCLient.userId !== userId) {
      throw new UnauthorizedException('has permission been denied');
    }

    return findCLient;
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    const findCLient = await this.clientsRepository.findOne(id);
    if (!findCLient) {
      throw new NotFoundException('Client not found');
    }

    if (findCLient.userId !== userId) {
      throw new UnauthorizedException('has permission been denied');
    }

    const client = await this.clientsRepository.update(id, updateClientDto);
    return client;
  }

  async delete(id: string, userId: string) {
    const findCLient = await this.clientsRepository.findOne(id);
    if (!findCLient) {
      throw new NotFoundException('Client not found');
    }

    if (findCLient.userId !== userId) {
      throw new UnauthorizedException('has permission been denied');
    }

    await this.clientsRepository.delete(id);
    return;
  }
}
