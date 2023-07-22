import { Checkbox, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const TodoItem = ({ todo }) => {
  const [isDone, setIsDone] = useState(false);
  return (
    <HStack>
      <Checkbox isChecked={isDone} onChange={(event) => setIsDone(event.target.checked)}></Checkbox>
    </HStack>
  );
};

export default TodoItem;
