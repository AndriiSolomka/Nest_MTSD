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

  describe('length', () => {
    it('should return 0 for an empty list', () => {
      expect(service.length()).toBe(0);
    });

    it('should return correct list length', () => {
      service.append('A');
      service.append('b');
      service.append('C');

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
      service.append('X');
      service.append('Y');
      service.append('Z');

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
      service.append('A');
      service.append('b');
      service.append('C');

      expect(() => service.insert('a', 5)).toThrow(Error);
      expect(() => service.insert('a', -1)).toThrow(Error);
    });

    it('should insert element at the beginning', () => {
      service.append('B');
      service.append('C');

      service.insert('A', 0);
      expect(service['head']?.value).toBe('A');
    });

    it('should insert element in the middle', () => {
      service.append('A');
      service.append('C');

      service.insert('B', 1);

      let current = service['head'];
      expect(current?.value).toBe('A');

      current = current?.next!;
      expect(current?.value).toBe('B');

      current = current?.next!;
      expect(current?.value).toBe('C');
    });

    it('should maintain circular linked list structure after insert', () => {
      service.append('A');
      service.append('C');
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

    it('should delete the only element in the list', () => {
      service.append('A');
      expect(service.delete(0)).toBe('A');
      expect(service.length()).toBe(0);
      expect(service['head']).toBeNull();
    });

    it('should delete the first element and update head', () => {
      service.append('A');
      service.append('B');
      service.append('C');

      expect(service.delete(0)).toBe('A');
      expect(service['head']?.value).toBe('B');
      expect(service.length()).toBe(2);
      expect(service['head']?.next?.next).toBe(service['head']);
    });

    it('should delete the last element and maintain circular structure', () => {
      service.append('A');
      service.append('B');
      service.append('C');

      expect(service.delete(2)).toBe('C');
      expect(service.length()).toBe(2);

      let current = service['head'];
      expect(current?.value).toBe('A');

      current = current?.next!;
      expect(current?.value).toBe('B');

      current = current?.next!;
      expect(current).toBe(service['head']);
    });

    it('should delete an element from the middle of the list', () => {
      service.append('A');
      service.append('B');
      service.append('C');

      expect(service.delete(1)).toBe('B');
      expect(service.length()).toBe(2);

      let current = service['head'];
      expect(current?.value).toBe('A');

      current = current?.next!;
      expect(current?.value).toBe('C');

      current = current?.next!;
      expect(current).toBe(service['head']);
    });
  });

  describe('deleteAll', () => {
    it('should do nothing if the list is empty', () => {
      service.deleteAll('A');
      expect(service.length()).toBe(0);
    });

    it('should do nothing if element is not in the list', () => {
      service.append('A');
      service.append('B');
      service.append('C');

      service.deleteAll('X');
      expect(service.length()).toBe(3);
    });

    it('should delete a single occurrence of an element', () => {
      service.append('A');
      service.append('B');
      service.append('C');

      service.deleteAll('B');
      expect(service.length()).toBe(2);

      let current = service['head'];
      expect(current?.value).toBe('A');

      current = current?.next!;
      expect(current?.value).toBe('C');

      current = current?.next!;
      expect(current).toBe(service['head']); // Перевірка циклічності
    });

    it('should delete multiple occurrences of an element', () => {
      service.append('A');
      service.append('B');
      service.append('B');
      service.append('C');

      service.deleteAll('B');
      expect(service.length()).toBe(2);

      let current = service['head'];
      expect(current?.value).toBe('A');

      current = current?.next!;
      expect(current?.value).toBe('C');

      current = current?.next!;
      expect(current).toBe(service['head']);
    });

    it('should delete all occurrences and leave an empty list', () => {
      service.append('A');
      service.append('A');
      service.append('A');

      service.deleteAll('A');
      expect(service.length()).toBe(0);
      expect(service['head']).toBeNull();
    });

    it('should delete all occurrences and update head properly', () => {
      service.append('B');
      service.append('A');
      service.append('C');
      service.append('A');
      service.append('D');

      service.deleteAll('A');
      expect(service.length()).toBe(3);

      let current = service['head'];
      expect(current?.value).toBe('B');

      current = current?.next!;
      expect(current?.value).toBe('C');

      current = current?.next!;
      expect(current?.value).toBe('D');

      current = current?.next!;
      expect(current).toBe(service['head']); // Перевірка циклічності
    });
  });

  describe('get', () => {
    let service: LinkedListService;

    beforeEach(() => {
      service = new LinkedListService();
    });

    it('should throw an error if index is negative', () => {
      service.append('A');
      expect(() => service.get(-1)).toThrow(Error);
    });

    it('should throw an error if index is greater than last element index', () => {
      service.append('A');
      service.append('B');
      expect(() => service.get(2)).toThrow(Error);
    });

    it('should throw an error if the list is empty', () => {
      expect(() => service.get(0)).toThrow(Error);
    });

    it('should return the correct element by index', () => {
      service.append('A');
      service.append('B');
      service.append('C');

      expect(service.get(0)).toBe('A');
      expect(service.get(1)).toBe('B');
      expect(service.get(2)).toBe('C');
    });
  });

  describe('clone', () => {
    let service: LinkedListService;
  
    beforeEach(() => {
      service = new LinkedListService();
    });
  
    it('should return an empty list if the original list is empty', () => {
      const clonedList = service.clone();
      expect(clonedList.length()).toBe(0);
    });
  
    it('should create a new list with the same elements', () => {
      service.append('A');
      service.append('B');
      service.append('C');
  
      const clonedList = service.clone();
  
      expect(clonedList.length()).toBe(3);
      expect(clonedList.get(0)).toBe('A');
      expect(clonedList.get(1)).toBe('B');
      expect(clonedList.get(2)).toBe('C');
    });
  
    it('should not modify the original list when modifying the cloned list', () => {
      service.append('X');
      service.append('Y');
  
      const clonedList = service.clone();
      clonedList.append('Z');
  
      expect(service.length()).toBe(2);
      expect(clonedList.length()).toBe(3);
    });
  
    it('should maintain circular linked list structure in the clone', () => {
      service.append('A');
      service.append('B');
  
      const clonedList = service.clone();
      
      expect(clonedList.get(0)).toBe('A');
      expect(clonedList.get(1)).toBe('B');
    });
  });
});
