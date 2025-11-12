export class TaskManager {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  reference?: string;
  createdAt: Date;
  updatedAt: Date;
}
