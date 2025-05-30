import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABE_KEY;
const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (error) {
			return null;
		}
	},

	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (error) {
			return null;
		}
	},
};
export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		mon: require("../assets/fonts/Montserrat-Regular.ttf"),
		"mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
		"mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY!}
			tokenCache={tokenCache}
		>
			<RootLayoutNav />
		</ClerkProvider>
	);
}

function RootLayoutNav() {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();
	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.push("/(modals)/login");
		}
	}, [isLoaded]);

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />

			<Stack.Screen
				name="(modals)/login"
				options={{
					title: "Login in or sign up",
					presentation: "modal",
					headerTitleStyle: {
						fontFamily: "mon-sb",
					},
					headerLeft: () => {
						return (
							<TouchableOpacity onPress={() => router.back()}>
								<Ionicons name="close-outline" size={28} />
							</TouchableOpacity>
						);
					},
				}}
			/>

			<Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />

			<Stack.Screen
				name="(modals)/booking"
				options={{
					presentation: "modal",
					//animation: "fade",
					headerLeft: () => {
						return (
							<TouchableOpacity onPress={() => router.back()}>
								<Ionicons name="close-outline" size={28} />
							</TouchableOpacity>
						);
					},
				}}
			/>
		</Stack>
	);
}
