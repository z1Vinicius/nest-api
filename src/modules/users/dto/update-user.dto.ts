import { Injectable } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import CreateUserDTO from './create-user.dto';

Injectable();
class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export default UpdateUserDTO;
