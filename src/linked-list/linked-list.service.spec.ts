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
});
