import { useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  GestureResponderEvent,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useUserContext } from "../context/GlobalProvider";
import { Redirect } from "expo-router";
import { UsePhpPesoWSign } from "../lib/utils";
import CustomButton from "../components/Button";
import { Plus } from "lucide-react-native";
import AddMoneyModal from "../components/AddMoneyModal";
import useMoneys from "../hooks/getMoneys";
import { supabase } from "../lib/supabase";

export default function List() {
  var _ = require("lodash");
  const { isLoading, session } = useUserContext();
  const [openAddMoneyModal, setOpenAddMoneyModal] = useState(false);
  const { moneys, moneysFetching, refetchMoneys } = useMoneys();
  const [contextMenuPoints, setContextMenuPoints] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);

  if (!session && !isLoading) return <Redirect href={"/login"} />;

  const total = _.sum(moneys?.map((money) => money.amount));

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  const getPoint = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    const isLeft = pageX < Dimensions.get("window").width - 100;
    setShowContextMenu((prev) => (prev ? false : true));
    setContextMenuPoints({
      x: isLeft ? pageX : Dimensions.get("window").width - 116,
      y: pageY,
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      {moneys && (
        <FlatList
          onScroll={() => setShowContextMenu(false)}
          ListHeaderComponent={
            <View
              className="p-4 border border-neutral-300 rounded-lg  flex-row items-center justify-between bg-white mb-12 mt-4"
              style={{ elevation: 10 }}
            >
              <Text className="font-readexproregular text-2xl">
                {UsePhpPesoWSign(total)}
              </Text>
              <CustomButton
                handlePress={() => setOpenAddMoneyModal(true)}
                containerStyles="rounded-full w-10 h-10"
              >
                <Plus className=" text-white" size={20} />
              </CustomButton>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={Boolean(moneysFetching)}
              onRefresh={() => refetchMoneys()}
            />
          }
          contentContainerStyle={{
            alignContent: "center",
            rowGap: 8,
            paddingHorizontal: 8,
          }}
          data={moneys}
          horizontal={false}
          keyExtractor={(money) => money.id}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => setShowContextMenu(false)}
              onLongPress={getPoint}
            >
              <View
                key={item.id}
                className="border border-neutral-300 p-2 rounded-lg flex-row justify-between"
              >
                <Text className="font-ralewaybold">{item.name}</Text>
                <Text className="font-readexproregular">
                  {UsePhpPesoWSign(item.amount)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          ListFooterComponent={<View className="h-12"></View>}
        />
      )}
      <AddMoneyModal
        close={(refetch) => {
          setOpenAddMoneyModal(false);
          if (refetch) {
            refetchMoneys();
          }
        }}
        open={openAddMoneyModal}
      />
      {showContextMenu && (
        <View
          className="absolute p-1 border border-neutral-300 rounded-lg bg-white m-2 w-[100px]"
          pointerEvents="none"
          style={{
            top: contextMenuPoints.y,
            left: contextMenuPoints.x,
            elevation: 10,
          }}
        >
          <CustomButton
            title="Edit"
            containerStyles="bg-white border border-neutral-300"
            textStyles="text-black"
            handlePress={() => {}}
          />
          <CustomButton
            title="Delete"
            containerStyles="bg-white border border-neutral-300 mt-1"
            textStyles="text-black"
            handlePress={() => {}}
          />
        </View>
      )}

      <Button onPress={handleLogout} title="Log Out" />
    </SafeAreaView>
  );
}
