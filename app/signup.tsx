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
import { Link, Redirect, router } from "expo-router";
import { useUserContext } from "../context/GlobalProvider";
import { supabase } from "../lib/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function SignUp() {
  const { isLoading: sessiongLoading, session } = useUserContext();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    if (cpassword !== password) {
      setLoading(false);
      Alert.alert("Password did not match!");
      return;
    }

    const { error } = await supabase.auth.signUp({
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

  const thirdInputRef = useRef<TextInput>(null);
  const focusThirdInput = () => {
    if (thirdInputRef.current) {
      thirdInputRef.current.focus();
    }
  };

  if (!sessiongLoading && session?.user) return <Redirect href={"list"} />;

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
          autoCapitalize="none"
          onSubmitEditing={focusSecondInput}
          blurOnSubmit={false}
        />
        <TextInput
          ref={secondInputRef}
          placeholder="password"
          className="border border-neutral-300 w-full py-2 px-4 rounded-lg mt-4"
          value={password}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={focusThirdInput}
          blurOnSubmit={false}
        />
        <TextInput
          ref={thirdInputRef}
          placeholder="confirm password"
          className="border border-neutral-300 w-full py-2 px-4 rounded-lg mt-4"
          value={cpassword}
          onChangeText={(e) => setCpassword(e)}
          secureTextEntry
        />
        <CustomButton
          title="Sign Up"
          containerStyles="mt-4 w-full py-4"
          handlePress={signInWithEmail}
          isLoading={loading}
        />
        <Text className="mt-4">
          or{" "}
          <Link className="font-ralewaybold" href={"/login"}>
            Log In
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
