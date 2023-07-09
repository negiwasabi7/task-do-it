import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';

const TaskItem = ({ task, onEditButtonClick }) => {
  return (
    <HStack>
      <Text p={4}>{task.title}</Text>
      <IconButton icon={<EditIcon />} onClick={() => onEditButtonClick(task.id)} />
      <IconButton icon={<DeleteIcon />} />
    </HStack>
  );
};

export default TaskItem;
