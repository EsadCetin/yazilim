import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableWithoutFeedback,
	TouchableOpacity,
	FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../assets/styles/ScreenStyles";
import { auth, db } from "../firebase";

const LessonScreen = ({ navigation }) => {
	const [lessons, setLessons] = useState([]);

	const onSignoutPress = () => {
		auth
			.signOut()
			.then(console.log("signed out"), navigation.replace("LoginScreen"));
	};
	const DATA = lessons.map(
		({ id, data: { lessonName, lessonTime, ownerEmail } }) => {
			return {
				key: id,
				name: lessonName,
				email: ownerEmail,
				date: lessonTime.toString().substring(0, 16),
			};
		}
	);

	useEffect(() => {
		const subscriber = db
			.collection("lessons")
			.where("ownerEmail", "==", auth?.currentUser?.email)
			.onSnapshot((snapshot) =>
				setLessons(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);

		return subscriber;
	}, []);
	return (
		<View style={styles.container}>
			<StatusBar />
			<View style={styles.Header}>
				<Text style={styles.HeaderText}>Derslerim</Text>
			</View>
			<TouchableOpacity onPress={() => onSignoutPress()} style={styles.LogOut}>
				<Icon name="sign-out" size={30} color="white" />
			</TouchableOpacity>
			<View style={styles.listView}>
				<FlatList
					data={DATA}
					renderItem={({ item }) => (
						<View>
							<View style={styles.list}>
								<Text style={styles.reminderName}>{item.name}</Text>
								<Text style={styles.reminderTime}>{item.date}</Text>

								<TouchableOpacity
									style={styles.deleteReminder}
									onPress={() =>
										db.collection("lessons").doc(item.key).delete()
									}
								>
									<Icon name="remove" size={30} color="red" />
								</TouchableOpacity>
							</View>
						</View>
					)}
				/>
			</View>
			<View style={styles.bottomBar}>
				<Icon name="book" size={30} color="#7CBCE6" style={styles.iconLeft} />
				<TouchableWithoutFeedback onPress={() => navigation.push("ExamScreen")}>
					<Icon
						name="pencil"
						size={30}
						color="white"
						style={styles.iconRight}
					/>
				</TouchableWithoutFeedback>
			</View>
			<TouchableWithoutFeedback
				onPress={() => navigation.navigate("AddLessonScreen")}
			>
				<Icon
					name="plus-circle"
					size={45}
					color="white"
					style={styles.iconAdd}
				/>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default LessonScreen;
