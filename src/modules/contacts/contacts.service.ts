import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactsRepository) {}
  async create(data: CreateContactDto) {
    const findContact = await this.contactRepository.findByEmail(data.email);
    if (findContact) {
      throw new ConflictException('E-mail already exists!');
    }

    const contact = await this.contactRepository.create(data);

    return contact;
  }

  async findAll(clientId: string) {
    const contacts = await this.contactRepository.findAll(clientId);
    return contacts;
  }

  async findOne(id: string) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('Contact not found');
    }

    return findContact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const findCLient = await this.contactRepository.findOne(id);
    if (!findCLient) {
      throw new NotFoundException('Contact not found');
    }

    const client = await this.contactRepository.update(id, updateContactDto);
    return client;
  }

  async delete(id: string) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('Contact not found');
    }
    await this.contactRepository.delete(id);
    return;
  }
}
