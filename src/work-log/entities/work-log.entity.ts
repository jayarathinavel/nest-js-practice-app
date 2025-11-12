export class WorkLog {
  id: number;
  date: string; // yyyy-mm-dd
  done?: string;
  todo?: string;
  createdAt: Date;
  updatedAt: Date;
}
