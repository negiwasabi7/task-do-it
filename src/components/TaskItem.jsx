import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Center, HStack, IconButton, Text } from '@chakra-ui/react';

const TaskItem = ({ task, handleEdit, handleDelete }) => {
  return (
    <HStack>
      <Text p={4} flex="1">
        {task.title}
      </Text>
      <Center w="12ch">
        <Text textAlign={'center'}>{task.deadline ? task.deadline : '-'}</Text>
      </Center>
      <IconButton icon={<EditIcon />} onClick={() => handleEdit(task.id)} />
      <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(task.id)} />
    </HStack>
  );
};

export default TaskItem;
