import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import React from 'react';
import { supabase } from '../api/supabaseClient';
import { useQuery } from 'react-query';

const Home = () => {
  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const { isLoading, error, data: taskList } = useQuery('tasks', fetchTasks);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {taskList.map((task) => (
        <HStack>
          <Box p={4}>{task.title}</Box>
          <IconButton icon={<EditIcon />} />
          <IconButton icon={<DeleteIcon />} />
        </HStack>
      ))}
    </>
  );
};

export default Home;
