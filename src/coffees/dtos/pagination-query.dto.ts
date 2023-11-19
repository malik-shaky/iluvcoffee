import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  //   @Type(() => Number)
  limit: number;

  //   @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;
}
