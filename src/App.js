import * as React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TaskEdit from './components/TaskEdit';
import NotFound from './components/NotFound';
import Home from './components/Home';
import { RecoilRoot } from 'recoil';

const homeUrl = process.env.PUBLIC_URL;

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Routes>
          <Route path={`${homeUrl}/signup`} element={<SignUp />}></Route>
          <Route path={`${homeUrl}/login`} element={<Login />}></Route>
          <Route path={`${homeUrl}/task_edit/:id`} element={<TaskEdit />}></Route>
          <Route path={`${homeUrl}/`} element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
