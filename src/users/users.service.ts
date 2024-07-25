import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }
  async create(createUserDto: CreateUserDto) {
    // return this.userRepository.save({ ...createUserDto, password });
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id: id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete({ id: id });
  }
}
