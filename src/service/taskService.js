import { supabase } from './supabaseClient';

export const fetchTasks = async (user_id) => {
  console.log('=== fetchTasks() ===');
  const { data, error } = await supabase
    .from('task_summary_view')
    .select()
    .eq('user_id', user_id)
    .order('deadline', { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const saveTask = async ({ user_id, task_id, task }) => {
  let result;

  let taskData;
  if (task.deadline) {
    taskData = task;
  } else {
    taskData = { ...task, deadline: null };
  }
  if (task_id) {
    result = await supabase
      .from('tasks')
      .update({ ...taskData, updated_at: new Date().toISOString() })
      .eq('id', task_id)
      .select()
      .single();
  } else {
    result = await supabase
      .from('tasks')
      .insert({ user_id, ...taskData })
      .select()
      .single();
  }

  const { data, error } = result;
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data.id;
};

export const deleteTask = async (task_id) => {
  const { error } = await supabase.from('tasks').delete().eq('id', task_id);
  if (error) {
    throw new Error(error.message);
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
