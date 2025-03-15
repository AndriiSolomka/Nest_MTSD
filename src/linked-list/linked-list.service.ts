import { Injectable } from '@nestjs/common';

class Node {
  value: string;
  next: Node | null = null;

  constructor(value: string) {
    this.value = value;
  }
}

@Injectable()
export class LinkedListService {
  private head: Node | null = null;

  length() {
    if (!this.head) return 0;

    let count = 0;
    let current: Node | null = this.head;

    do {
      count++;
      if (!current.next) break;
      current = current.next;
    } while (current !== this.head);

    return count;
  }

  append(element: string): void {
    this.checkElement(element);
    const newNode = new Node(element);
    if (!this.head) {
      this.head = newNode;
      this.head.next = this.head;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next!;
      }
      current.next = newNode;
      newNode.next = this.head;
    }
  }

  checkElement(element: string) {
    if (element.length !== 1) throw new Error('Invalid element input');
  }
}
