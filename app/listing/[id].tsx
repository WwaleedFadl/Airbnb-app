import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id);
  return (
    <View>
      <Text>id</Text>
    </View>
  );
}
