import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (findUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.usersRepository.create(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findOne(id: string, userId: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (id !== userId) {
      throw new UnauthorizedException('has permission been denied');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, userId: string) {
    if (updateUserDto.email) {
      const findUser = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );
      if (findUser) {
        throw new ConflictException('Email already exists');
      }
    }
    if (id !== userId) {
      throw new UnauthorizedException('has permission been denied');
    }
    const user = await this.usersRepository.update(id, updateUserDto);
    return user;
  }

  async delete(id: string, userId: string) {
    if (id !== userId) {
      throw new UnauthorizedException('has permission been denied');
    }
    await this.usersRepository.delete(id);
    return;
  }
}
