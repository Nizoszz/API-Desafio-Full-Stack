import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  clientId: string;
  readonly createdAt: string;
  constructor() {
    this.id = randomUUID();
  }
}
