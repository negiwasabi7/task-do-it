import { supabase } from './supabaseClient';

export const fetchTodos = async (task_id) => {
  console.log('=== fetchTodos() ===');
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

export const saveTodos = async ({ task_id, todoList }) => {
  for (let todo of todoList) {
    const { id, ...data } = todo;
    const todo_data = { ...data, task_id };
    if (id) {
      const { error } = await supabase
        .from('todos')
        .update({ ...todo_data, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) {
        throw error;
      }
    } else {
      const { error: insertError } = await supabase.from('todos').insert(todo_data);
      if (insertError) {
        throw insertError;
      }
    }
  }
};
