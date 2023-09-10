import { Strategy } from 'passport';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// In anonymous.strategy.ts
@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy, 'anonymous') {
  constructor() {
    super();
  }

  authenticate() {
    return this.success({});
  }
}
