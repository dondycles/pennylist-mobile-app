import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ViewComponent,
} from "react-native";

//@ts-ignore
import CustomButton from "../components/Button";
import { router } from "expo-router";
import images from "../constants/images";
export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="pt-16">
        <View className="m-auto items-center">
          <Image source={images.logo} className="h-32 w-32" />
          <Text className="font-ralewayblack text-3xl mt-4 px-4 text-center">
            Avoid becoming penniless, start using pennylist.
          </Text>
          <Text className="font-medium text-lg  text-center mt-4 px-4">
            Designed to be simple like writing on a piece of paper. No more
            overwhelming features and complex interfaces.
          </Text>
          <CustomButton
            containerStyles="mt-4"
            title="Get Started"
            handlePress={() => router.replace("/login")}
          />
        </View>
        <View className="border border-zinc-300 rounded-lg p-4 mt-16 mx-4">
          <Text className="font-ralewayblack text-xl">Simple</Text>
          <Text className="font-ralewaymedium">
            Keep it as straightforward as jotting down notes on a piece of
            paper.
          </Text>
        </View>
        <View className="border border-yellow-500 rounded-lg p-4 mt-4 mx-4 bg-yellow-500/5">
          <Text className="font-ralewayblack text-xl text-yellow-500">
            Customizable
          </Text>
          <Text className="font-ralewaymedium text-yellow-500">
            Bored with black and white? Then, make it colorful.
          </Text>
        </View>
        <View className="border border-zinc-300  rounded-lg p-4 mt-4 mb-24 mx-4">
          <Text className="font-ralewayblack text-xl">Analytics</Text>
          <Text className="font-ralewaymedium">
            Dive into your progress with insightful charts and tables.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
