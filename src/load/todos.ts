import { Todo } from '../components/types/Todo';
import { client } from '../utils/storage';

export function getAll() {
  return client.get();
}

export function addOne(data: Todo) {
  return client.post(data);
}

export function updateOne(id: number, newData: Omit<Todo, 'id' | 'title' | 'description'>) {
  return client.patch(id, newData);
}
