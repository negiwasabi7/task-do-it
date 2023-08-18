import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Center, HStack, IconButton, Progress, Text } from '@chakra-ui/react';

const TaskItem = ({ task, handleEdit, handleDelete }) => {
  const progress = task.todo_count === 0 ? 0 : (task.done_count / task.todo_count) * 100;
  return (
    <HStack>
      <Text p={4} flex="1">
        {task.title}
      </Text>
      <Center w="12ch">
        <Text textAlign={'center'}>{task.deadline ? task.deadline : '-'}</Text>
      </Center>
      <Progress width={100} colorScheme={progress === 100 ? 'green' : 'blue'} value={progress} />
      <IconButton icon={<EditIcon />} onClick={() => handleEdit(task.id)} />
      <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(task.id)} />
    </HStack>
  );
};

export default TaskItem;
