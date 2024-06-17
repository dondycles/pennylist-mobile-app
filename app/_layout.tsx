import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { UserContext } from "../context/GlobalProvider";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded, error] = useFonts({
    "Raleway-Black": require("../assets/fonts/Raleway-Black.ttf"),
    "Raleway-Bold": require("../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-ExtraBold": require("../assets/fonts/Raleway-ExtraBold.ttf"),
    "Raleway-ExtraLight": require("../assets/fonts/Raleway-ExtraLight.ttf"),
    "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf"),
    "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
    "Raleway-Regular": require("../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
    "Raleway-Thin": require("../assets/fonts/Raleway-Thin.ttf"),
    "ReadexPro-Bold": require("../assets/fonts/ReadexPro-Bold.ttf"),
  });

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .finally(() => setIsLoading(false));

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe;
    };
  }, []);

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserContext.Provider value={{ session, isLoading }}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: "dark",
          statusBarTranslucent: false,
          animation: "ios",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="list" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
      </Stack>
    </UserContext.Provider>
  );
}
