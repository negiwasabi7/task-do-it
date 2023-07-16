import { supabase } from './supabaseClient';

export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select()
    .order('updated_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateTask = async ({ task_id, task }) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...task, updated_at: new Date().toISOString() })
    .eq('id', task_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchTask = async (task_id) => {
  const { data, error } = await supabase.from('tasks').select().eq('id', task_id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
