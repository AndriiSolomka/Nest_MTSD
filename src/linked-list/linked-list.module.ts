import { Module } from '@nestjs/common';
import { LinkedListService } from './linked-list.service';

@Module({
  providers: [LinkedListService]
})
export class LinkedListModule {}
