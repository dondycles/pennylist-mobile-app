import {
  Alert,
  AppState,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import images from "../constants/images";
import { useRef, useState } from "react";
import CustomButton from "../components/Button";
import { supabase } from "../lib/supabase";
import { Link, Redirect, router } from "expo-router";
import { useUserContext } from "../context/GlobalProvider";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function LogIn() {
  const { isLoading: sessionLoading, session } = useUserContext();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: userName + "@pennylist.com",
      password: password,
    });

    if (error) {
      setLoading(false);
      Alert.alert(error.message);
      return;
    }
    router.push("/list");
  }
  const secondInputRef = useRef<TextInput>(null);
  const focusSecondInput = () => {
    if (secondInputRef.current) {
      secondInputRef.current.focus();
    }
  };

  if (!sessionLoading && session?.user) return <Redirect href={"list"} />;

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View className="items-center justify-center w-full max-w-[300px]">
        <Image source={images.logo} className="h-32 w-32" />
        <Text className="text-2xl font-ralewaymedium  mt-4">
          Log in to <Text className="font-ralewayblack">pennylist.</Text>{" "}
        </Text>
        <TextInput
          placeholder="username"
          className="border border-neutral-300 w-full py-2 px-4 rounded-lg mt-4"
          value={userName}
          onChangeText={(e) => setUserName(e)}
          returnKeyType="next"
          onSubmitEditing={focusSecondInput}
          blurOnSubmit={false}
          autoCapitalize="none"
        />
        <TextInput
          ref={secondInputRef}
          placeholder="password"
          className="border border-neutral-300 w-full py-2 px-4 rounded-lg mt-4"
          value={password}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry
          autoCapitalize="none"
        />
        <CustomButton
          title="Log In"
          containerStyles="mt-4 w-full py-4"
          handlePress={signInWithEmail}
          isLoading={loading}
        />
        <Text className="mt-4">
          or{" "}
          <Link className="font-ralewaybold" href={"/signup"}>
            Sign Up
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
