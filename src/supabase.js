import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://vvmfnkenqtnebvfrzbox.supabase.co";

const supabaseKey ="sb_publishable_  3GE8FZVfFjWu93IugJNvZg_L7Rlt6a2  ";


export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);