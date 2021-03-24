import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuardService {
  fetch(user: string): string {
    return `Hello World! name: ${user}`;
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
