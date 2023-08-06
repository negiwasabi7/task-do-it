import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';
import { deleteTask, fetchTasks } from '../service/taskService';
import { Box, Button, Center, HStack, Stack, VStack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/state';

const homeUrl = process.env.PUBLIC_URL;

const Home = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const tasksQuery = useQuery(['tasks', user.id], () => fetchTasks(user.id), {
    staleTime: 1000 * 60 * 5,
  });

  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: (task_id) => {
      queryClient.invalidateQueries('task');
      queryClient.invalidateQueries('tasks');
    },
    onError: () => {
      console.log('taskMutation error');
    },
  });

  const onEditButtonClick = (task_id) => {
    navigate(`${homeUrl}/task_edit/${task_id}`);
  };

  const onDeleteButtonClick = (task_id) => {
    deleteTaskMutation.mutate(task_id);
  };

  if (tasksQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (tasksQuery.error) {
    return <div>Error: {tasksQuery.error.message}</div>;
  }

  const taskList = tasksQuery.data;
  return (
    <>
      <VStack>
        <Button onClick={() => navigate(`${homeUrl}/task_edit/new`)}>タスク追加</Button>
        <Box>
          {taskList.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleEdit={onEditButtonClick}
              handleDelete={onDeleteButtonClick}
            />
          ))}
        </Box>
      </VStack>
    </>
  );
};

export default Home;
