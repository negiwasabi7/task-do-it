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
    if (id) {
      const { error } = await supabase
        .from('todos')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) {
        throw error;
      }
    } else {
      const { error: insertError } = await supabase.from('todos').insert(data);
      if (insertError) {
        throw insertError;
      }
    }
  }
};
