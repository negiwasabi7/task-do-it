import * as React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TaskEdit from './components/TaskEdit';
import NotFound from './components/NotFound';
import Home from './components/Home';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { userState } from './store/state';

const homeUrl = process.env.PUBLIC_URL;

const ProtectedRoute = ({ user, redirectPath = `${homeUrl}/login` }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
function App() {
  const user = useRecoilValue(userState);
  return (
    <ChakraProvider>
      <Routes>
        <Route path={`${homeUrl}/signup`} element={<SignUp />}></Route>
        <Route path={`${homeUrl}/login`} element={<Login />}></Route>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path={`${homeUrl}/`} element={<Home />}></Route>
          <Route path={`${homeUrl}/task_edit/:task_id`} element={<TaskEdit />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
