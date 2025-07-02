import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly config: NestConfigService) {}

  get dbHost(): string {
    return this.config.get<string>('DB_HOST')!;
  }

  get dbPort(): number {
    return this.config.get<number>('DB_PORT')!;
  }

  get dbUser(): string {
    return this.config.get<string>('DB_USERNAME')!;
  }

  get dbPass(): string {
    return this.config.get<string>('DB_PASSWORD')!;
  }

  get dbName(): string {
    return this.config.get<string>('DB_NAME')!;
  }
}
