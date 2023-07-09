import React from 'react';
import { useParams } from 'react-router-dom';

const TaskEdit = () => {
  const { id } = useParams();
  console.log(id);

  return <div>TaskEdit</div>;
};

export default TaskEdit;
