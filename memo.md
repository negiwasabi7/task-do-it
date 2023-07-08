# ライブラリ

## Chakra UI

https://chakra-ui.com/

npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion

## React Router

https://reactrouter.com/en/main

npm install react-router-dom

## supabase

https://supabase.com/docs/reference/javascript/installing

npm install @supabase/supabase-js

# 参考

## React Router

https://reffect.co.jp/react/react-router-6/

## Protected Routes

https://www.robinwieruch.de/react-router-private-routes/

## データベース

```SQL
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    title VARCHAR(128),
    content TEXT
);
```
