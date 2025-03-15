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

  insert(element: string, index: number) {
    this.checkElement(element);
    this.checkIndex(index);

    const newNode = new Node(element);

    if (!this.head) {
      this.head = newNode;
      this.head.next = this.head;
      return;
    }

    if (index === 0) {
      let tail = this.head;
      while (tail.next !== this.head) {
        tail = tail.next!;
      }
      newNode.next = this.head;
      tail.next = newNode;
      this.head = newNode;
      return;
    }

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next!;
    }

    newNode.next = prev.next;
    prev.next = newNode;
  }

  delete(index: number): string {
    this.checkIndex(index);
    if (!this.head) throw new Error('List is empty');

    let deletedValue: string;

    if (index === 0) {
      deletedValue = this.head.value;

      if (this.head.next === this.head) {
        this.head = null;
        return deletedValue;
      }

      let tail = this.head;
      while (tail.next !== this.head) {
        tail = tail.next!;
      }

      this.head = this.head.next;
      tail.next = this.head;
      return deletedValue;
    }

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next!;
    }

    deletedValue = prev.next!.value;
    prev.next = prev.next!.next;

    return deletedValue;
  }

  checkElement(element: string) {
    if (element.length !== 1) throw new Error('Invalid element input');
  }

  checkIndex(index: number) {
    const listLength = this.length() - 1;
    if (index < 0 || index > listLength) throw new Error('Invalid index');
  }
}
