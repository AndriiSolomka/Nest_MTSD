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

  deleteAll(element: string): void {
    if (!this.head) return;

    let current = this.head;
    let prev: Node | null = null;
    let tail = this.head;

    while (tail.next !== this.head) {
      tail = tail.next!;
    }

    do {
      if (current.value === element) {
        if (current === this.head) {
          this.head = this.head.next;
          tail.next = this.head;
          current = this.head!;
        } else {
          prev!.next = current.next;
          current = current.next!;
        }
      } else {
        prev = current;
        current = current.next!;
      }
    } while (current !== this.head);

    if (this.head?.value === element) {
      this.head = null;
    }
  }

  get(index: number): string {
    this.checkIndex(index);

    if (!this.head) throw new Error('List is empty');

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }

    return current.value;
  }

  clone(): LinkedListService {
    const newList = new LinkedListService();
    if (!this.head) return newList;

    let current = this.head;
    do {
      newList.append(current.value);
      current = current.next!;
    } while (current !== this.head);

    return newList;
  }

  findFirst(element: string): number {
    this.checkElement(element);
    if (!this.head) return -1;

    let index = 0;
    let current = this.head;

    do {
      if (current.value === element) return index;
      index++;
      current = current.next!;
    } while (current !== this.head);

    return -1;
  }

  findLast(element: string): number {
    this.checkElement(element);
    if (!this.head) return -1;

    let index = 0;
    let lastIndex = -1;
    let current = this.head;

    do {
      if (current.value === element) lastIndex = index;
      index++;
      current = current.next!;
    } while (current !== this.head);

    return lastIndex;
  }

  checkElement(element: string) {
    if (element.length !== 1) throw new Error('Invalid element input');
  }

  checkIndex(index: number) {
    const listLength = this.length() - 1;
    if (index < 0 || index > listLength) throw new Error('Invalid index');
  }
}
