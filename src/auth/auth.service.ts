import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bycryptjs from 'bcryptjs'

import { CreateUserDto, LoginDto, RegisterDto, UpdateAuthDto } from './dto';

import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { Task } from '../dashboard/entities/task.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,

    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {


    try {

      //Encriptar contraseña
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bycryptjs.hashSync(password, 10),
        ...userData
      });


      await newUser.save();

      const { password: _, ...user } = newUser.toJSON();

      return user

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists!`)
      }
      throw new InternalServerErrorException('Something terrible happen!!!')
    }

  }

  async register(registerDto: RegisterDto): Promise<LoginResponse> {

    const user = await this.create(registerDto)

    return {
      user: user,
      token: this.getJwtToken({ id: user._id }),
    }
  }



  async login(loginDto: LoginDto): Promise<LoginResponse> {

    const { email, password } = loginDto;

    // Verificar que el email coincide con el de la BD
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('No valid credentials - email');
    }

    // Comparo la contraseña del usuario con la contraseña de la BD
    if (!bycryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('No valid credentials - password');
    }


    const { password: _, ...rest } = user.toJSON()

    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    }
  }


  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    const { password, ...rest } = user.toJSON();

    return rest;
  }



  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);

    return token

  }
}
