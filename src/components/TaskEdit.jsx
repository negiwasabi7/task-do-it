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
import { useMutation, useQuery } from 'react-query';
import { fetchTask, saveTask } from '../service/taskService';

const TaskEdit = () => {
  const user = useRecoilValue(userState);
  const user_id = user.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState([
    {
      id: 1,
      done: false,
      content: 'TODO #001',
      todo_order: 1,
    },
    {
      id: 2,
      done: false,
      content: 'TODO #002',
      todo_order: 3,
    },
    {
      id: 3,
      done: false,
      content: 'TODO #003',
      todo_order: 4,
    },
  ]);
  const { task_id } = useParams();
  const navigate = useNavigate();
  const homeUrl = process.env.PUBLIC_URL;
  console.log(task_id);
  console.log(user.email);

  const taskQuery = useQuery(['task', task_id], () => fetchTask(task_id));

  const mutation = useMutation(saveTask, {
    onSuccess: () => {
      navigate(`${homeUrl}/`);
    },
    onError: () => {
      console.log('mutation error');
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

  const onSubmit = (event) => {
    event.preventDefault(); //ブラウザのデフォルトの動作を抑制する

    console.log(todos);
    mutation.mutate({ user_id, task_id, task: { title, content } });
  };

  const onAddTodoClick = () => {
    const newTodo = {
      id: null,
      done: false,
      content: '',
      todo_order: 1,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  if (taskQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (taskQuery.error) {
    return <div>Error: {taskQuery.error.message}</div>;
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
              {todos.map((todo, index) => (
                <HStack>
                  <Checkbox
                    isChecked={todos[index].done}
                    onChange={(event) => {
                      const newTodos = [...todos];
                      newTodos[index].done = event.target.checked;
                      setTodos(newTodos);
                    }}
                  ></Checkbox>
                  <Input
                    type="text"
                    width="30ch"
                    size="md"
                    value={todos[index].content}
                    onChange={(event) => {
                      const newTodos = [...todos];
                      newTodos[index].content = event.target.value;
                      setTodos(newTodos);
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
