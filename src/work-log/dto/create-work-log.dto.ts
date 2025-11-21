import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkLogDto {

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
