import { Button, Center, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { useNavigate } from 'react-router-dom';

const homeUrl = process.env.PUBLIC_URL;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const signin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log('===ERROR===');
      console.log(error);
      setErrorMessage(error.message);
    } else {
      console.log('===SIGNIN OK===');
      console.log(data);
      navigate(`${homeUrl}/`);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault(); //ブラウザのデフォルトの動作を抑制する
    signin(email, password1);
    console.log(`email=${email} password1=${password1} `);
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <form onSubmit={onSubmit}>
        <Stack>
          <FormControl isRequired>
            <FormLabel>メールアドレス</FormLabel>
            <Input
              type="email"
              width="30ch"
              size="md"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              width="30ch"
              size="md"
              value={password1}
              onChange={(event) => setPassword1(event.target.value)}
            />
          </FormControl>
          <Center>
            <Text fontSize="lx" color="red">
              {errorMessage}
            </Text>
          </Center>
          <Center>
            <Button type="submit" colorScheme="blue" size="lg">
              ログイン
            </Button>
          </Center>
        </Stack>
      </form>
    </Flex>
  );
};

export default Login;
