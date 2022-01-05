import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableWithoutFeedback,
	Platform,
	TouchableOpacity,
	Modal,
} from "react-native";
import styles from "../assets/styles/ScreenStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { Keyboard } from "react-native";
import { auth, db } from "../firebase";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: true,
	}),
});

const AddLessonScreen = ({ navigation }) => {
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [lesson, setLesson] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedColor, setSelectedColor] = useState(false);
	const [bgColor, setBgColor] = useState();

	const addLesson = async () => {
		if (lesson == "") {
			return setModalVisible(true);
		} else {
			await db.collection("lessons").doc().set({
				lessonName: lesson,
				lessonTime: date.toLocaleString(),
				lessonNotif: date,
				ownerEmail: auth?.currentUser?.email,
			});
			schedulePushNotification();
			console.log(date);
			navigation.navigate("LessonScreen");
		}
	};

	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: lesson + " 📚",
				body: date.toLocaleString().substring(0, 16),
			},
			trigger: { date: date },
		});
	}

	const changeColor = () => setBgColor(!bgColor);
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};

	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<StatusBar />
				<View style={styles.Header}>
					<Text style={styles.HeaderText}>Ders Ekle</Text>
				</View>
				<TouchableOpacity
					style={styles.backLogo}
					onPress={() => navigation.goBack()}
				>
					<Icon name="chevron-left" size={30} color="white" />
				</TouchableOpacity>
				<View style={styles.addExam}>
					<TextInput
						placeholder="Dersinizin adını giriniz"
						value={lesson}
						selectionColor="#2874A6"
						underlineColor="#2874A6"
						activeUnderlineColor="#2874A6"
						onChangeText={(text) => setLesson(text)}
					/>
				</View>
				<View style={styles.time}>
					<TouchableOpacity onPress={showDatepicker}>
						<View style={styles.timePicker}>
							<Text style={styles.addText}>
								{date.toString().substring(4, 15)}
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={showTimepicker}>
						<View style={styles.timePicker}>
							<Text style={styles.addText}>
								{date.toString().substring(15, 21)}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				{show && (
					<DateTimePicker
						style={styles.dateTimePicker}
						testID="dateTimePicker"
						value={date}
						mode={mode}
						is24Hour={true}
						display="default"
						onChange={onChange}
					/>
				)}
				<TouchableWithoutFeedback onPress={() => changeColor()}>
					<View
						style={{
							backgroundColor: bgColor ? "#258" : "#288",
							width: windowWidth / 3,
							height: windowHeight / 15,
							alignSelf: "center",
							alignItems: "center",
							justifyContent: "center",
							marginTop: windowHeight / 40,
							borderRadius: 5,
							borderWidth: 2,
						}}
					>
						<Text style={styles.addText}>Haftalık Tekrarla</Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => addLesson()}>
					<View style={styles.button}>
						<Text style={styles.addText}>Ekle</Text>
					</View>
				</TouchableWithoutFeedback>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Ders adı boş olamaz</Text>
							<TouchableOpacity
								style={styles.ReadButton}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.textStyle}>Tamam</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		</DismissKeyboard>
	);
};

export default AddLessonScreen;
