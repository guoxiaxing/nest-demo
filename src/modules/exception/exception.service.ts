import { Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionService {
  fetch(id: number): string {
    return `Hello World! ${id}`;
  }

  save(message: string): string {
    return `Set Hello Done.${message}`;
  }

  update(id: string, message: string): string {
    return `Update Hello Done. ${id}：${message}`;
  }

  remove(id: number): string {
    return `${id} Record Was Removed.`;
  }
}
