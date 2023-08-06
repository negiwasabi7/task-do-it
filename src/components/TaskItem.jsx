import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';

const TaskItem = ({ task, handleEdit, handleDelete }) => {
  return (
    <HStack>
      <Text p={4}>{task.title}</Text>
      <IconButton icon={<EditIcon />} onClick={() => handleEdit(task.id)} />
      <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(task.id)} />
    </HStack>
  );
};

export default TaskItem;
