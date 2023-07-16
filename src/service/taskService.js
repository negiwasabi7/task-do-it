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
  const { error } = await supabase
    .from('tasks')
    .update({ ...task, updated_at: new Date().toISOString() })
    .eq('id', task_id);
};

export const fetchTask = async (task_id) => {
  const { data, error } = await supabase.from('tasks').select().eq('id', task_id).single();
  if (!error) {
    console.log('=== fetchTask ===');
  } else {
    console.log(error.message);
  }

  return data;
};
