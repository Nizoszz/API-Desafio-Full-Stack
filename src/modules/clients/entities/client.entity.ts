import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  readonly createdAt: string;
  readonly userId: string;

  constructor() {
    this.id = randomUUID();
  }
}
