export interface Task {
  _id: string;
  title: string;
  check: boolean;
  dueDate?: Date;
  createdAt: string;
  updatedAt: string;
}
