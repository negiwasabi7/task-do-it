import { supabase } from './supabaseClient';

export const fetchTasks = async (user_id) => {
  console.log('=== fetchTasks() ===');
  const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('user_id', user_id)
    .order('updated_at', { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const saveTask = async ({ user_id, task_id, task }) => {
  let result;

  if (task_id) {
    result = await supabase
      .from('tasks')
      .update({ ...task, updated_at: new Date().toISOString() })
      .eq('id', task_id)
      .select()
      .single();
  } else {
    result = await supabase
      .from('tasks')
      .insert({ user_id, ...task })
      .select()
      .single();
  }

  const { data, error } = result;
  if (error) {
    throw error;
  }
  return data.id;
};

export const deleteTask = async (task_id) => {
  const { error } = await supabase.from('tasks').delete().eq('id', task_id);
  if (error) {
    throw error;
  }
};

export const fetchTask = async (task_id) => {
  console.log('=== fetchTask() ===');
  const { data, error } = await supabase.from('tasks').select().eq('id', task_id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
