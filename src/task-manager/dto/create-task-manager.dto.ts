import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateTaskManagerDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['pending', 'in-progress', 'completed'])
  status?: 'pending' | 'in-progress' | 'completed' = 'pending';
}
