import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TaskManager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  
  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ['pending', 'in-progress', 'completed', 'cancelled'], default: 'pending' })
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';

  @Column({ nullable: true })
  reference?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
