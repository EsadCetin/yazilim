import React from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ExamScreen from "./screens/ExamScreen";
import LessonScreen from "./screens/LessonScreen";
import AddExamScreen from "./screens/AddExamScreen";
import AddLessonScreen from "./screens/AddLessonScreen";
import LoginScreen from "./screens/LoginScreen";
import TimerNotification from "./screens/testScreen";

const Stack = createStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator initialRouteName={LoginScreen}>
			<Stack.Screen
				name="LoginScreen"
				options={{ headerShown: false }}
				component={LoginScreen}
			/>
			<Stack.Screen
				name="LessonScreen"
				options={{ headerShown: false }}
				component={LessonScreen}
			/>
			<Stack.Screen
				name="ExamScreen"
				options={{ headerShown: false }}
				component={ExamScreen}
			/>
			<Stack.Screen
				name="AddExamScreen"
				options={{ headerShown: false }}
				component={AddExamScreen}
			/>
			<Stack.Screen
				name="AddLessonScreen"
				options={{ headerShown: false }}
				component={AddLessonScreen}
			/>
			<Stack.Screen
				name="testScreen"
				options={{ headerShown: false }}
				component={TimerNotification}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	let [fontsLoaded] = useFonts({
		Yellowtail: require("./assets/fonts/Yellowtail-Regular.ttf"),
		Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
		PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
	});

	if (!fontsLoaded) {
		return (
			<View
				style={{
					flexDirection: "row",
					alignSelf: "center",
					justifyContent: "center",
					flex: 1,
				}}
			>
				<ActivityIndicator size="large" color="#2874A6" />
			</View>
		);
	} else {
		return (
			<NavigationContainer>
				<MyStack />
			</NavigationContainer>
		);
	}
}
