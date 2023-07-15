import React from 'react';
import { supabase } from '../api/supabaseClient';
import { useQuery } from 'react-query';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';

const homeUrl = process.env.PUBLIC_URL;

const Home = () => {
  const navigate = useNavigate();
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .order('updated_at', { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const { isLoading, error, data: taskList } = useQuery('tasks', fetchTasks);

  const onEditButtonClick = (task_id) => {
    navigate(`${homeUrl}/task_edit/${task_id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {taskList.map((task) => (
        <TaskItem key={task.id} task={task} onEditButtonClick={onEditButtonClick} />
      ))}
    </>
  );
};

export default Home;
