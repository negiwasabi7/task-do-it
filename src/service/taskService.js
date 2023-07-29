import { supabase } from './supabaseClient';

export const fetchTasks = async (user_id) => {
  const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('user_id', user_id)
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
export const saveTask = async ({ user_id, task_id, task }) => {
  let result;

  if (task_id) {
    result = await supabase
      .from('tasks')
      .update({ ...task, updated_at: new Date().toISOString() })
      .eq('id', task_id);
  } else {
    result = await supabase.from('tasks').insert({ user_id, ...task });
  }

  const { data, error } = result;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const insertTask = async (task) => {
  const { data, error } = await supabase.from('tasks').insert({ ...task });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchTask = async (task_id) => {
  if (!task_id) {
    return null;
  }
  const { data, error } = await supabase.from('tasks').select().eq('id', task_id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
