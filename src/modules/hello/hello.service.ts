import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  get(id: number): string {
    return `GET Method, param id: ${id}`;
  }
  post(messsage: string): string {
    return `POST Method, body is: ${messsage}`;
  }
  update(id: number, messsage: string): string {
    return `PATCH Method, param id: ${id}, body is: ${messsage}`;
  }
  delete(id: number): string {
    return `DELETE Method, param id: ${id}`;
  }
}
