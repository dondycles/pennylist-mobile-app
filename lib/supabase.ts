import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const getUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        setUser(user);
      })
      .finally(() => setIsLoading(false));

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(user);
    });
  }, [isLoading, supabase]);

  // const { user } = (await supabase.auth.getUser()).data;

  return { user, isLoading };
};
