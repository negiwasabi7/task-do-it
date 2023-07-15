import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/state';
import { supabase } from '../api/supabaseClient';
import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const TaskEdit = () => {
  const user = useRecoilValue(userState);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { task_id } = useParams();
  console.log(task_id);
  console.log(user.email);

  const fetchTask = async () => {
    const { data: task, error } = await supabase
      .from('tasks')
      .select()
      .eq('user_id', user.id)
      .eq('id', task_id)
      .single();
    console.log(user.id);
    console.log(task_id);
    if (!error) {
      console.log(task);
      setTitle(task.title);
      setContent(task.content);
    } else {
      console.log(error.message);
    }
  };

  const updateTask = async () => {
    const { error } = await supabase
      .from('tasks')
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq('id', task_id);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault(); //ブラウザのデフォルトの動作を抑制する
    updateTask();
  };

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
