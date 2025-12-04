import { Type } from 'class-transformer';
import { IsString, IsOptional, IsIn, IsNumber } from 'class-validator';

export class CreateTaskManagerDto {

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['pending', 'in-progress', 'completed'])
  status?: 'pending' | 'in-progress' | 'completed';

  @IsOptional()
  @IsString()
  reference?: string;
}
