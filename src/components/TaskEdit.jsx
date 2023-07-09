import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/state';
import { supabase } from '../api/supabaseClient';

const TaskEdit = () => {
  const user = useRecoilValue(userState);
  const { id } = useParams();
  console.log(id);
  console.log(user.email);

  const fetchTask = async () => {
    const { data: task, error } = await supabase
      .from('tasks')
      .select()
      .eq('user_id', user.id)
      .eq('id', id);
    console.log(task);
  };

  fetchTask();
  return <div>TaskEdit</div>;
};

export default TaskEdit;
