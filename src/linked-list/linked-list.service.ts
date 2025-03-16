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
  private size = 0;

  length(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  append(element: string): void {
    this.insert(element, this.size);
  }

  insert(element: string, index: number): void {
    this.checkElement(element);
    this.checkIndex(index, true);

    const newNode = new Node(element);

    if (!this.head) {
      this.head = newNode;
      this.head.next = this.head;
    } else if (index === 0) {
      let tail = this.head;
      while (tail.next !== this.head) {
        tail = tail.next!;
      }
      newNode.next = this.head;
      tail.next = newNode;
      this.head = newNode;
    } else {
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next!;
      }
      newNode.next = prev.next;
      prev.next = newNode;
    }

    this.size++;
  }

  delete(index: number): string {
    this.checkIndex(index);
    if (!this.head) throw new Error('List is empty');

    let deletedValue: string;

    if (index === 0) {
      deletedValue = this.head.value;
      if (this.head.next === this.head) {
        this.head = null;
      } else {
        let tail = this.head;
        while (tail.next !== this.head) {
          tail = tail.next!;
        }
        this.head = this.head.next;
        tail.next = this.head;
      }
    } else {
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next!;
      }
      deletedValue = prev.next!.value;
      prev.next = prev.next?.next ?? this.head;
    }

    this.size--;
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
        this.size--;
      } else {
        prev = current;
        current = current.next!;
      }
    } while (current !== this.head);

    if (this.head?.value === element) {
      this.head = null;
      this.size = 0;
    } else {
      tail = this.head;
      while (tail.next !== this.head) {
        tail = tail.next!;
      }
      tail.next = this.head;
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

  reverse(): void {
    if (!this.head || this.head.next === this.head) {
      return;
    }

    let prev: Node | null = null;
    let current: Node | null = this.head;
    let next: Node | null = null;
    let tail = this.head;

    while (tail.next !== this.head) {
      tail = tail.next!;
    }

    do {
      next = current!.next;
      current!.next = prev;
      prev = current;
      current = next;
    } while (current !== this.head);

    this.head.next = prev;
    this.head = prev;
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

  clear(): void {
    this.head = null;
    this.size = 0;
  }

  extend(otherList: LinkedListService): void {
    if (!otherList.head) return;

    let current = otherList.head;
    do {
      this.append(current.value);
      current = current.next!;
    } while (current !== otherList.head);
  }

  checkElement(element: string) {
    if (element.length !== 1) throw new Error('Invalid element input');
  }

  private checkIndex(index: number, allowEqual = false): void {
    const maxIndex = allowEqual ? this.size : this.size - 1;
    if (index < 0 || index > maxIndex) {
      throw new Error('Invalid index');
    }
  }
}
