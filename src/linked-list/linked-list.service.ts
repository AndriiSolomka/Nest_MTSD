import { Injectable } from '@nestjs/common';

class Node {
  value: string;
  next: Node | null = null;

  constructor(value: string) {
    this.value = value;
  }
}

@Injectable()
export class LinkedListService {}
