import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/state';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchTask, saveTask } from '../service/taskService';
import { fetchTodos } from '../service/todoService';

const TaskEdit = () => {
  const user = useRecoilValue(userState);
  const user_id = user.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [todoList, setTodoList] = useState([]);
  const { task_id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const homeUrl = process.env.PUBLIC_URL;
  console.log(task_id);
  console.log(user.email);

  const taskQuery = useQuery(['task', task_id], () => fetchTask(task_id), {
    enabled: !!task_id, //task_idが有効な時のみ実行する
    staleTime: 1000 * 60 * 5,
  });
  const todosQuery = useQuery(['todoList', task_id], () => fetchTodos(task_id), {
    enabled: !!task_id,
    staleTime: 1000 * 60 * 5,
  });

  const taskMutation = useMutation(saveTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('task');
      navigate(`${homeUrl}/`);
    },
    onError: () => {
      console.log('taskMutation error');
    },
  });

  useEffect(() => {
    const task = taskQuery.data;
    console.log('==== useEffect ===');
    console.log(task);
    if (task) {
      setTitle(task.title);
      setContent(task.content);
    }
  }, [taskQuery.data]);

  useEffect(() => {
    const todos = todosQuery.data;
    if (todos) {
      setTodoList(todos);
    }
  }, [todosQuery.data]);

  const onSubmit = (event) => {
    event.preventDefault(); //ブラウザのデフォルトの動作を抑制する

    console.log(todoList);
    taskMutation.mutate({ user_id, task_id, task: { title, content } });
  };

  const onAddTodoClick = () => {
    const newTodo = {
      id: null,
      done: false,
      content: '',
      todo_order: 1,
    };
    const newTodos = [...todoList, newTodo];
    setTodoList(newTodos);
  };

  if (taskQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (taskQuery.error) {
    console.error(taskQuery.error);
    return <div>Error(taskQuery): {taskQuery.error}</div>;
  }
  if (todosQuery.error) {
    console.error(todosQuery.error);
    return <div>Error(todosQuery): {taskQuery.error}</div>;
  }

  return (
    <>
      <div>taskedit</div>
      <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
        <form onSubmit={onSubmit}>
          <VStack>
            <FormControl isRequired>
              <FormLabel>タイトル</FormLabel>
              <Input
                type="text"
                width="30ch"
                size="md"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </FormControl>
          </VStack>
          <VStack>
            <FormControl>
              <FormLabel>内容</FormLabel>
              <Input
                type="text"
                width="30ch"
                size="md"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </FormControl>
          </VStack>
          <Center>
            <Button onClick={onAddTodoClick}>TODOを追加</Button>
          </Center>
          <VStack>
            <Box>
              {todoList.map((todo, index) => (
                <HStack>
                  <Checkbox
                    isChecked={todoList[index].done}
                    onChange={(event) => {
                      const newTodos = [...todoList];
                      newTodos[index].done = event.target.checked;
                      setTodoList(newTodos);
                    }}
                  ></Checkbox>
                  <Input
                    type="text"
                    width="30ch"
                    size="md"
                    value={todoList[index].content}
                    onChange={(event) => {
                      const newTodos = [...todoList];
                      newTodos[index].content = event.target.value;
                      setTodoList(newTodos);
                    }}
                  />
                </HStack>
              ))}
            </Box>
          </VStack>
          <Center>
            <Button type="submit" colorScheme="blue" size="lg">
              保存
            </Button>
          </Center>
        </form>
      </Flex>
      <>{title}</>
    </>
  );
};

export default TaskEdit;
