import { Module } from '@nestjs/common';
import { LinkedListModule } from './linked-list/linked-list.module';

@Module({
  imports: [LinkedListModule],
})
export class AppModule {}
