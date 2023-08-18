import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';
import { countTasks, deleteTask, fetchTasks } from '../service/taskService';
import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/state';

const homeUrl = process.env.PUBLIC_URL;

const Home = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState(0);

  const tasksQuery = useQuery(['tasks', user.id, pageIndex], () => fetchTasks(user.id, pageIndex), {
    staleTime: 1000 * 60 * 5,
  });

  const taskCountQuery = useQuery(['taskCount', user.id], () => countTasks(user.id), {
    enabled: !!user.id,
    staleTime: 1000 * 60 * 5,
  });

  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: (task_id) => {
      //1件のみ表示しているときにそのデータを削除した時はpageIndexを1つ戻す
      if (tasksQuery.data.length === 1 && pageIndex > 0) {
        setPageIndex((pageIndex) => pageIndex - 1);
      }
      queryClient.invalidateQueries('task');
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('taskCount');
    },
    onError: () => {
      console.error('taskMutation error');
    },
  });

  const onEditButtonClick = (task_id) => {
    navigate(`${homeUrl}/task_edit/${task_id}`);
  };

  const onDeleteButtonClick = (task_id) => {
    deleteTaskMutation.mutate(task_id);
  };

  if (tasksQuery.isLoading || taskCountQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (tasksQuery.error) {
    return <div>Error: {tasksQuery.error.message}</div>;
  }

  const taskList = tasksQuery.data;
  const numberOfTasks = taskCountQuery.data;
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
        <HStack>
          <Button
            isDisabled={pageIndex === 0}
            onClick={() => setPageIndex((pageIndex) => pageIndex - 1)}
          >
            前ページ
          </Button>
          <Button
            isDisabled={pageIndex * 10 + taskList.length >= numberOfTasks}
            onClick={() => setPageIndex((pageIndex) => pageIndex + 1)}
          >
            次ページ
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default Home;
