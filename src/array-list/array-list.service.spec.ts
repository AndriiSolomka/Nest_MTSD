import { Test, TestingModule } from '@nestjs/testing';
import { ArrayListService } from './array-list.service';

describe('ArrayListService', () => {
  let service: ArrayListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArrayListService],
    }).compile();

    service = module.get<ArrayListService>(ArrayListService);
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
      service.append('B');
      service.append('C');
      expect(service.length()).toBe(3);
    });

    it('should throw Error if element is not a single character', () => {
      expect(() => service.append('abc')).toThrow(Error);
      expect(() => service.append('')).toThrow(Error);
    });
  });

  describe('insert', () => {
    it('should insert element at correct index', () => {
      fillList('A', 'C');
      service.insert('B', 1);
      expect(service.get(1)).toBe('B');
    });

    it('should throw Error for invalid index', () => {
      expect(() => service.insert('A', -1)).toThrow(Error);
      expect(() => service.insert('B', 10)).toThrow(Error);
    });

    it('should throw Error if element is not a single character', () => {
      expect(() => service.insert('abc', 0)).toThrow(Error);
    });
  });

  describe('delete', () => {
    it('should delete element by index', () => {
      fillList('A', 'B', 'C');
      expect(service.delete(1)).toBe('B');
      expect(service.length()).toBe(2);
    });

    it('should throw Error for invalid index', () => {
      expect(() => service.delete(0)).toThrow(Error);
      expect(() => service.append('')).toThrow(Error);
    });
  });

  describe('deleteAll', () => {
    it('should delete all occurrences of an element', () => {
      fillList('A', 'B', 'A', 'C');
      service.deleteAll('A');
      expect(service.length()).toBe(2);
    });

    it('should not modify the list if element not found', () => {
      fillList('X', 'Y');
      service.deleteAll('Z');
      expect(service.length()).toBe(2);
    });
  });

  describe('get', () => {
    it('should return correct element by index', () => {
      fillList('A', 'B', 'C');
      expect(service.get(0)).toBe('A');
      expect(service.get(1)).toBe('B');
      expect(service.get(2)).toBe('C');
    });

    it('should throw Error for invalid index', () => {
      expect(() => service.get(-1)).toThrow(Error);
      expect(() => service.get(10)).toThrow(Error);
    });
  });

  describe('findFirst', () => {
    it('should find the first occurrence of an element', () => {
      fillList('A', 'B', 'A');
      expect(service.findFirst('A')).toBe(0);
      expect(service.findFirst('B')).toBe(1);
    });

    it('should return -1 if element is not found', () => {
      expect(service.findFirst('X')).toBe(-1);
    });
  });

  describe('findLast', () => {
    it('should find the last occurrence of an element', () => {
      fillList('A', 'B', 'A');
      expect(service.findLast('A')).toBe(2);
    });

    it('should return -1 if element is not found', () => {
      expect(service.findLast('Z')).toBe(-1);
    });
  });

  describe('clone', () => {
    it('should create a copy of the list', () => {
      fillList('A', 'B');
      const clonedList = service.clone();
      expect(clonedList).toEqual(['A', 'B']);
    });
  });

  describe('reverse', () => {
    it('should reverse the list', () => {
      fillList('A', 'B', 'C');
      service.reverse();
      expect(service.get(0)).toBe('C');
      expect(service.get(1)).toBe('B');
      expect(service.get(2)).toBe('A');
    });
  });

  describe('clear', () => {
    it('should remove all elements from the list', () => {
      fillList('A', 'B', 'C');
      service.clear();
      expect(service.length()).toBe(0);
    });
  });

  describe('extend', () => {
    it('should extend the list with another list', () => {
      fillList('A');
      service.extend(['B', 'C']);
      expect(service.length()).toBe(3);
      expect(service.get(1)).toBe('B');
      expect(service.get(2)).toBe('C');
    });

    it('should throw Error if extended list contains invalid elements', () => {
      expect(() => service.extend(['A', 'BB'])).toThrow(Error);
    });
  });
});
