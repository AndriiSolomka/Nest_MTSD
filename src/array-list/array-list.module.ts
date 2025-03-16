import { Module } from '@nestjs/common';
import { ArrayListService } from './array-list.service';

@Module({
  providers: [ArrayListService]
})
export class ArrayListModule {}
