import { Module } from '@nestjs/common';
import { LinkedListModule } from './linked-list/linked-list.module';
import { ArrayListModule } from './array-list/array-list.module';

@Module({
  imports: [LinkedListModule, ArrayListModule],
})
export class AppModule {}
