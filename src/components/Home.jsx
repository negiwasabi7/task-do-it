import React from 'react';
import { useQuery } from 'react-query';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';
import { fetchTasks } from '../service/taskService';
import { Box, Button, Center, HStack, Stack, VStack } from '@chakra-ui/react';

const homeUrl = process.env.PUBLIC_URL;

const Home = () => {
  const navigate = useNavigate();

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
      <VStack>
        <Button onClick={() => navigate(`${homeUrl}/task_edit/new`)}>タスク追加</Button>
        <Box>
          {taskList.map((task) => (
            <TaskItem key={task.id} task={task} onEditButtonClick={onEditButtonClick} />
          ))}
        </Box>
      </VStack>
    </>
  );
};

export default Home;
