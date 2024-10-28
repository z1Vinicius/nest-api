import { Injectable } from '@nestjs/common';

Injectable();
class ListUserDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
  ) {}
}

export default ListUserDTO;
