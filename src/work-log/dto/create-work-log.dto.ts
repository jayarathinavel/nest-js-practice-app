import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateWorkLogDto {
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  done?: string;

  @IsOptional()
  @IsString()
  todo?: string;
}
