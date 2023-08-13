import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/state';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchTask, saveTask } from '../service/taskService';
import { fetchTodos, saveTodos } from '../service/todoService';
import { DeleteIcon } from '@chakra-ui/icons';

const TaskEdit = () => {
  const user = useRecoilValue(userState);
  const user_id = user.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState('');
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
    onSuccess: (task_id) => {
      queryClient.invalidateQueries('task');
      queryClient.invalidateQueries('tasks');
      if (todoList.length === 0) {
        navigate(`${homeUrl}/`);
      } else {
        todoMutation.mutate({ task_id, todoList });
      }
    },
    onError: () => {
      console.log('taskMutation error');
    },
  });

  const todoMutation = useMutation(saveTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries('todoList');
      navigate(`${homeUrl}/`);
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
    taskMutation.mutate({ user_id, task_id, task: { title, content, deadline } });
  };

  const maxTodoOrder = (todos) => {
    if (todos.length < 1) {
      return 0;
    }
    return Math.max(...todos.map((todo) => todo.todo_order));
  };

  const onAddTodoClick = () => {
    setTodoList((prevTodoList) => {
      const newTodo = {
        id: null,
        done: false,
        content: '',
        todo_order: maxTodoOrder(prevTodoList) + 1,
      };
      return [...prevTodoList, newTodo];
    });
  };

  const onDeleteTodoClick = (todoOrder) => {
    setTodoList((prevTodoList) => {
      const newTodoList = [...prevTodoList];
      const todoIndex = todoList.findIndex((todo) => todo.todo_order === todoOrder);
      newTodoList[todoIndex].deleted = true;
      return newTodoList;
    });
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

  const filterdList = todoList.filter(function (todoList) {
    return !todoList.deleted;
  });
  return (
    <>
      <div>taskedit</div>
      <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
        <form onSubmit={onSubmit}>
          <VStack>
            <Center>
              <Box>
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

                <FormControl>
                  <FormLabel>内容</FormLabel>
                  <Textarea
                    type="text"
                    width="30ch"
                    size="md"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>期限</FormLabel>
                  <Input
                    type="date"
                    size="md"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                  />
                </FormControl>
              </Box>
            </Center>
          </VStack>
          <Center>
            <Button onClick={onAddTodoClick} mt="3" mb="3">
              TODOを追加
            </Button>
          </Center>
          <Divider mt="5" mb="5" borderColor="black" />
          <VStack>
            <Box>
              {filterdList.map((todo, index) => (
                <HStack key={todo.todo_order}>
                  <Checkbox
                    isChecked={filterdList[index].done}
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
                    value={filterdList[index].content}
                    onChange={(event) => {
                      const newTodos = [...todoList];
                      newTodos[index].content = event.target.value;
                      setTodoList(newTodos);
                    }}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => onDeleteTodoClick(filterdList[index].todo_order)}
                  />
                </HStack>
              ))}
            </Box>
          </VStack>
          <Center>
            <Button type="submit" colorScheme="blue" size="lg">
              保存
            </Button>
            <Button onClick={() => navigate(`${homeUrl}/`)}>キャンセル</Button>
          </Center>
        </form>
      </Flex>
      <>{title}</>
    </>
  );
};

export default TaskEdit;
