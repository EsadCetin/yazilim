import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase";
import styles from "../assets/styles/ScreenStyles";

const ExamScreen = ({ navigation }) => {
	const [exams, setExams] = useState([]);

	const DATA = exams.map(({ id, data: { examName, examTime } }) => {
		return {
			key: id,
			name: examName,
			date: examTime.toString().substring(0, 16),
		};
	});

	useEffect(() => {
		const subscriber = db
			.collection("exams")
			.where("ownerEmail", "==", auth?.currentUser?.email)
			.onSnapshot((snapshot) =>
				setExams(
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
				<Text style={styles.HeaderText}>Sınavlarım</Text>
			</View>
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
									onPress={() => db.collection("exams").doc(item.key).delete()}
								>
									<Icon name="remove" size={30} color="red" />
								</TouchableOpacity>
							</View>
						</View>
					)}
				/>
			</View>
			<View style={styles.bottomBar}>
				<TouchableWithoutFeedback
					onPress={() => navigation.navigate("LessonScreen")}
				>
					<Icon name="book" size={30} color="white" style={styles.iconLeft} />
				</TouchableWithoutFeedback>
				<Icon
					name="pencil"
					size={30}
					color="#7CBCE6"
					style={styles.iconRight}
				/>
			</View>
			<TouchableWithoutFeedback
				onPress={() => navigation.navigate("AddExamScreen")}
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

export default ExamScreen;
