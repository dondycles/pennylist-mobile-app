import { useState } from "react";
import { Text, TextInput, View, Keyboard } from "react-native";
import CustomButton from "./Button";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";

export default function AddMoneyModal({
  open,
  close,
}: {
  open: boolean;
  close: (refetch: boolean) => void;
}) {
  const [value, setValue] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addMoney = async () => {
    setIsAdding(true);
    const { error } = await supabase
      .from("moneys")
      .insert({ amount: value, name: name });

    if (error) Alert.alert(error.message);
    setIsAdding(false);
    setName(null);
    setValue(null);
    close(true);
    Keyboard.dismiss();
  };

  return (
    <View
      className={`p-2 border border-neutral-300 absolute align-middle left-1/2 -translate-x-32 w-64 rounded-lg bg-white top-16 transition-all ease-in-out ${
        open ? "opacity-100" : "opacity-0"
      }`}
      style={{ elevation: 10 }}
      pointerEvents={open ? "auto" : "none"}
    >
      <Text className="font-ralewayblack text-center">Add Money</Text>
      <TextInput
        placeholder="Name"
        className="border border-neutral-300 w-full py-2 px-4 rounded-lg mt-2"
        value={name ?? ""}
        onChangeText={(e) => setName(e)}
      />
      <TextInput
        placeholder="Amount"
        className="border border-neutral-300 w-full py-2 px-4 rounded-lg mt-2"
        value={value ?? ""}
        onChangeText={setValue}
        inputMode="numeric"
      />

      <View className="flex-row mt-2 flex-1">
        <CustomButton
          containerStyles="flex-1 mr-1"
          title="Add"
          handlePress={addMoney}
          isLoading={isAdding}
        />
        <CustomButton
          containerStyles="flex-1 ml-1 bg-white border border-neutral-300"
          textStyles="text-black"
          title="Cancel"
          handlePress={() => {
            setValue(null);
            setName(null);
            close(false);
            Keyboard.dismiss();
          }}
          isLoading={isAdding}
        />
      </View>
    </View>
  );
}
