import { Button, Center, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { supabase } from '../service/supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log('===ERROR===');
      console.log(error);
    } else {
      console.log('===SIGNUP OK===');
      console.log(data);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault(); //ブラウザのデフォルトの動作を抑制する
    if (password1 !== password2) {
      setErrorMessage('パスワードが一致しません。');
      return;
    }
    setErrorMessage('');
    signup(email, password1);
    console.log(`email=${email} password1=${password1} password2=${password2}`);
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
          <FormControl isRequired>
            <FormLabel>パスワード(確認用)</FormLabel>
            <Input
              type="password"
              width="30ch"
              size="md"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
            />
          </FormControl>
          <Center>
            <Text fontSize="lx" color="red">
              {errorMessage}
            </Text>
          </Center>
          <Center>
            <Button type="submit" colorScheme="blue" size="lg">
              登録
            </Button>
          </Center>
        </Stack>
      </form>
    </Flex>
  );
};

export default SignUp;
