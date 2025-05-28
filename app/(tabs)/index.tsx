import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function Page() {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Bookings</Link>
      <Link href={"/listing/55555"}>Listing Details Page</Link>
    </View>
  );
}
