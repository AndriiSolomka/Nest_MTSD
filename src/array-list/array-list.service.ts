import { Injectable } from '@nestjs/common';

@Injectable()
export class ArrayListService {
  private list: string[] = [];

  length(): number {
    return this.size;
  }

  append(element: string): void {
    this.checkElement(element);
    this.list.push(element);
  }

  insert(element: string, index: number): void {
    this.checkElement(element);
    this.checkIndex(index, true);
    this.list.splice(index, 0, element);
  }

  delete(index: number): string {
    this.checkIndex(index);
    return this.list.splice(index, 1)[0];
  }

  deleteAll(element: string): void {
    this.checkElement(element);
    this.list = this.list.filter((el) => el !== element);
  }

  get(index: number): string {
    this.checkIndex(index);
    return this.list[index];
  }

  clone(): string[] {
    return [...this.list];
  }

  reverse(): void {
    this.list.reverse();
  }

  findFirst(element: string): number {
    this.checkElement(element);
    return this.list.indexOf(element);
  }

  findLast(element: string): number {
    this.checkElement(element);
    return this.list.lastIndexOf(element);
  }

  clear(): void {
    this.list = [];
  }

  extend(elements: string[]): void {
    elements.forEach((element) => this.checkElement(element));
    this.list = [...this.list, ...elements];
  }

  private get size(): number {
    return this.list.length;
  }

  private checkIndex(index: number, allowEqual = false): void {
    const maxIndex = allowEqual ? this.size : this.size - 1;
    if (index < 0 || index > maxIndex) throw new Error('Invalid index');
  }

  private checkElement(element: string): void {
    if (element.length !== 1) throw new Error('Invalid element input');
  }
}
