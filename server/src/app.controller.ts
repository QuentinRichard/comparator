import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ComparisonRequestData, ComparisonResponseData } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('comparison')
  @HttpCode(200)
  async makeComparison(
    @Body() data: ComparisonRequestData,
  ): Promise<ComparisonResponseData> {
    console.log('Post makeComparison');
    return await this.appService.makeComparison(data);
  }
}
