import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkLogDto {

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId: number

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  done?: string;

  @IsOptional()
  @IsString()
  todo?: string;
}
