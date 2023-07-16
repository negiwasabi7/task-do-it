import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/state';
import { Button, Center, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetchTask, saveTask } from '../service/taskService';

const TaskEdit = () => {
  const user = useRecoilValue(userState);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { task_id } = useParams();
  const navigate = useNavigate();
  const homeUrl = process.env.PUBLIC_URL;
  console.log(task_id);
  console.log(user.email);

  const { isLoading, error, data: task } = useQuery(['task', task_id], () => fetchTask(task_id));

  const mutation = useMutation(saveTask, {
    onSuccess: () => {
      navigate(`${homeUrl}/`);
    },
    onError: () => {
      console.log('mutation error');
    },
  });

  useEffect(() => {
    console.log('==== useEffect ===');
    console.log(task);
    if (task) {
      setTitle(task.title);
      setContent(task.content);
    }
  }, [task]);

  const onSubmit = (event) => {
    event.preventDefault(); //ブラウザのデフォルトの動作を抑制する

    mutation.mutate({ task_id, task: { title, content } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>taskedit</div>
      <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
        <form onSubmit={onSubmit}>
          <Stack>
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
          </Stack>
          <Stack>
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
          </Stack>
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
