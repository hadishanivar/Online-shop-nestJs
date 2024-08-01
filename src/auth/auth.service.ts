import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserRepository: UserRepository,
    private readonly JwtService: JwtService,
  ) {}

  async createUser(
    createUserData: CreateUserDto,
  ): Promise<{ message: string; token: string }> {
    const user = await this.UserRepository.createUser(createUserData);

    const payload = {
      id: (user as any)._id,
      phoneNumber: user.phoneNumber,
    };

    const token = await this.JwtService.signAsync(payload);

    return {
      message: 'welcome, you signed up successfully',
      token,
    };
  }
}
