import { Test, TestingModule } from '@nestjs/testing';
import { LinkedListService } from './linked-list.service';

describe('LinkedListService', () => {
  let service: LinkedListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkedListService],
    }).compile();

    service = module.get<LinkedListService>(LinkedListService);
  });

  const fillList = (...values: string[]) =>
    values.forEach((v) => service.append(v));

  describe('length', () => {
    it('should return 0 for an empty list', () => {
      expect(service.length()).toBe(0);
    });

    it('should return correct list length', () => {
      fillList('A', 'B', 'C');
      expect(service.length()).toBe(3);
    });
  });

  describe('append', () => {
    it('should append elements', () => {
      service.append('A');
      expect(service.length()).toBe(1);

      service.append('B');
      expect(service.length()).toBe(2);

      service.append('C');
      expect(service.length()).toBe(3);
    });

    it('should set head to itself when appending first element', () => {
      service.append('A');
      expect(service['head']?.value).toBe('A');
      expect(service['head']?.next).toBe(service['head']);
    });

    it('should maintain circular linked list structure', () => {
      fillList('X', 'Y', 'Z');

      let current = service['head'];
      expect(current?.value).toBe('X');

      current = current?.next!;
      expect(current?.value).toBe('Y');

      current = current?.next!;
      expect(current?.value).toBe('Z');

      current = current?.next!;
      expect(current).toBe(service['head']);
    });

    it('should throw Error if element is not a single character', () => {
      expect(() => service.append('abc')).toThrow(Error);
      expect(() => service.append('ABS')).toThrow(Error);
      expect(() => service.append('')).toThrow(Error);
    });
  });

  describe('insert', () => {
    it('should throw Error if element is not a single character', () => {
      expect(() => service.insert('abc', 0)).toThrow(Error);
      expect(() => service.insert('ABS', 0)).toThrow(Error);
      expect(() => service.insert('', 0)).toThrow(Error);
    });

    it('should throw Error if index incorrect', () => {
      fillList('A', 'b', 'C');

      expect(() => service.insert('a', 5)).toThrow(Error);
      expect(() => service.insert('a', -1)).toThrow(Error);
    });

    it('should insert element at the beginning', () => {
      fillList('B', 'C', 'A');

      service.insert('A', 0);
      expect(service['head']?.value).toBe('A');
    });

    it('should insert element in the middle', () => {
      fillList('A', 'C');
      service.insert('B', 1);

      let current = service['head'];
      expect(current?.value).toBe('A');

      current = current?.next!;
      expect(current?.value).toBe('B');

      current = current?.next!;
      expect(current?.value).toBe('C');
    });

    it('should maintain circular linked list structure after insert', () => {
      fillList('A', 'C');
      service.insert('B', 1);

      let current = service['head'];
      expect(current?.value).toBe('A');

      current = current?.next!;
      expect(current?.value).toBe('B');

      current = current?.next!;
      expect(current?.value).toBe('C');

      current = current?.next!;
      expect(current).toBe(service['head']);
    });
  });

  describe('delete', () => {
    it('should throw an error if index is out of bounds', () => {
      expect(() => service.delete(0)).toThrow(Error);
      service.append('A');
      expect(() => service.delete(1)).toThrow(Error);
      expect(() => service.delete(-1)).toThrow(Error);
    });

    it('should delete elements correctly', () => {
      fillList('A', 'B', 'C');

      expect(service.delete(1)).toBe('B');
      expect(service.length()).toBe(2);

      let current = service['head'];
      expect(current?.value).toBe('A');

      current = current?.next!;
      expect(current?.value).toBe('C');

      expect(current?.next).toBe(service['head']);
    });
  });

  describe('deleteAll', () => {
    it('should do nothing if the list is empty', () => {
      service.deleteAll('A');
      expect(service.length()).toBe(0);
    });

    it('should do nothing if element is not in the list', () => {
      fillList('A', 'B', 'C');

      service.deleteAll('X');
      expect(service.length()).toBe(3);
    });

    it('should remove multiple occurrences of an element', () => {
      fillList('A', 'B', 'B', 'C');
      service.deleteAll('B');
      expect(service.length()).toBe(2);
      expect(service['head']?.value).toBe('A');
    });

    it('should remove all occurrences and leave an empty list', () => {
      fillList('A', 'A', 'A');
      service.deleteAll('A');
      expect(service.length()).toBe(0);
      expect(service['head']).toBeNull();
    });
  });

  describe('get', () => {
    it('should throw an error if index is negative', () => {
      service.append('A');
      expect(() => service.get(-1)).toThrow(Error);
    });

    it('should throw an error if index is greater than last element index', () => {
      fillList('A', 'B');

      expect(() => service.get(2)).toThrow(Error);
    });

    it('should throw an error if the list is empty', () => {
      expect(() => service.get(0)).toThrow(Error);
    });

    it('should return the correct element by index', () => {
      fillList('A', 'B', 'C');

      expect(service.get(0)).toBe('A');
      expect(service.get(1)).toBe('B');
      expect(service.get(2)).toBe('C');
    });
  });

  describe('findFirst', () => {
    it('should return -1 if the list is empty', () => {
      expect(service.findFirst('A')).toBe(-1);
    });

    it('should return the correct index when the element is found', () => {
      fillList('A', 'B', 'C');

      expect(service.findFirst('A')).toBe(0);
      expect(service.findFirst('B')).toBe(1);
      expect(service.findFirst('C')).toBe(2);
    });

    it('should return -1 if the element is not in the list', () => {
      fillList('A', 'B', 'C');

      expect(service.findFirst('Z')).toBe(-1);
    });
  });

  describe('clone', () => {
    it('should return an empty list if the original list is empty', () => {
      const clonedList = service.clone();
      expect(clonedList.length()).toBe(0);
    });

    it('should create a new list with the same elements', () => {
      fillList('A', 'B', 'C');

      const clonedList = service.clone();

      expect(clonedList.length()).toBe(3);
      expect(clonedList.get(0)).toBe('A');
      expect(clonedList.get(1)).toBe('B');
      expect(clonedList.get(2)).toBe('C');
    });

    it('should maintain circular linked list structure in the clone', () => {
      fillList('A', 'B');

      const clonedList = service.clone();

      expect(clonedList.get(0)).toBe('A');
      expect(clonedList.get(1)).toBe('B');
    });
  });

  describe('findLast', () => {
    it('should return -1 if the list is empty', () => {
      expect(service.findLast('A')).toBe(-1);
    });

    it('should return the correct index when the element is found once', () => {
      service.append('A');
      service.append('B');
      service.append('C');

      expect(service.findLast('A')).toBe(0);
      expect(service.findLast('B')).toBe(1);
      expect(service.findLast('C')).toBe(2);
    });

    it('should return -1 if the element is not in the list', () => {
      service.append('X');
      service.append('Y');

      expect(service.findLast('Z')).toBe(-1);
    });

    it('should return the last occurrence of the element', () => {
      service.append('A');
      service.append('B');
      service.append('A');
      service.append('C');

      expect(service.findLast('A')).toBe(2);
    });
  });

  describe('clear', () => {
    it('should remove all elements from the list', () => {
      fillList('A', 'B', 'C');

      expect(service.length()).toBe(3);
      service.clear();
      expect(service.length()).toBe(0);
    });
  });

  describe('extend', () => {
    let list1: LinkedListService;
    let list2: LinkedListService;

    beforeEach(() => {
      list1 = new LinkedListService();
      list2 = new LinkedListService();
    });

    it('should do nothing if the second list is empty', () => {
      list1.append('A');
      list1.extend(list2);

      expect(list1.length()).toBe(1);
      expect(list1.get(0)).toBe('A');
    });

    it('should copy all elements from another list', () => {
      list1.append('A');
      list2.append('B');
      list2.append('C');

      list1.extend(list2);

      expect(list1.length()).toBe(3);
      expect(list1.get(0)).toBe('A');
      expect(list1.get(1)).toBe('B');
      expect(list1.get(2)).toBe('C');
    });
  });
});
