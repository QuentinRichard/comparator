import { Injectable } from '@nestjs/common';
import { ComparisonRequestData, ComparisonResponseData } from './app.dto';
import { AppRepository } from './app.repository';
import { HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  async makeComparison(
    data: ComparisonRequestData,
  ): Promise<ComparisonResponseData> {
    if (data.type === 'url') {
      try {
        return await this.appRepository.makeComparison(data);
      } catch (error) {
        console.log(error.message);
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Type ${data.type} not implemented yet`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
