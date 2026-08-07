-- Supabase schema for NYI AI

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- profiles (user metadata)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text,
  email text,
  avatar_url text,
  role text DEFAULT 'free', -- owner / admin / premium / free
  plan text DEFAULT 'free',
  premium_expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- chats
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text,
  created_at timestamptz DEFAULT now()
);

-- messages
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role text NOT NULL, -- system / user / assistant
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan text NOT NULL,
  start_date timestamptz NOT NULL DEFAULT now(),
  expire_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'active' -- active / expired / cancelled
);

-- payments
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id),
  plan text NOT NULL,
  method text NOT NULL, -- KBZPay / WavePay
  amount integer NOT NULL,
  transaction_id text,
  screenshot_path text,
  status text NOT NULL DEFAULT 'pending', -- pending / approved / rejected
  created_at timestamptz DEFAULT now(),
  reviewed_by uuid REFERENCES profiles(id)
);

-- images
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id),
  prompt text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- security logs
CREATE TABLE IF NOT EXISTS security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  ip text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

-- daily message counts
CREATE TABLE IF NOT EXISTS daily_message_counts (
  user_id uuid NOT NULL REFERENCES profiles(id),
  date date NOT NULL,
  messages_count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, date)
);