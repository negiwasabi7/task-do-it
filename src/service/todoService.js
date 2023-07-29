import { supabase } from './supabaseClient';

export const fetchTodos = async (task_id) => {
  if (!task_id) {
    return [];
  }
  const { data, error } = await supabase
    .from('todos')
    .select()
    .eq('task_id', task_id)
    .order('todo_order', { ascending: true });
  if (error) {
    throw error;
  }
  return data;
};
