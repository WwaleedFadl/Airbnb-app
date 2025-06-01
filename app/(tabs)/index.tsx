import { View } from "react-native";
import { Stack } from 'expo-router'
import ExploreHeader from "@/components/ExploreHeader";
import Listing from "@/components/Listing";
export default function Page() {

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{
        header: () => <ExploreHeader />,
      }} />
      <Listing />
    </View>
  );
}
