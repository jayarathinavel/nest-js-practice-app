import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  getProtected(): string {
    return 'Protected route';
  }

  @Get('public')
  getPublic(): string {
    return 'Public route';
  }

  @UseGuards(JwtGuard)
  @Get('tasks')
  getTasks() {
    return [
      { id: 1, title: 'Complete documentation' },
      { id: 2, title: 'Fix UI bugs' },
      { id: 3, title: 'Review PR #42' },
    ];
  }
}
