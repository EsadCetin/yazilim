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

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

const AddExamScreen = ({ navigation }) => {
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [exam, setExam] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const addExam = async () => {
		if (exam == "") {
			return setModalVisible(true);
		} else {
			await db.collection("exams").doc().set({
				examName: exam,
				examTime: date.toLocaleString(),
				examNotif: date,
				ownerEmail: auth?.currentUser?.email,
			});

			schedulePushNotification();
			navigation.navigate("ExamScreen");
		}
	};

	const NotifTime = () => {
		addExam();
	};

	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: exam + " 📝",
				body: date.toLocaleString().substring(0, 16),
			},
			trigger: { seconds: 2 },
		});
	}

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
					<Text style={styles.HeaderText}>Sınav Ekle</Text>
				</View>
				<TouchableOpacity
					style={styles.backLogo}
					onPress={() => navigation.goBack()}
				>
					<Icon name="chevron-left" size={30} color="white" />
				</TouchableOpacity>
				<View style={styles.addExam}>
					<TextInput
						placeholder="Sınavınızın adını giriniz"
						value={exam}
						selectionColor="#2874A6"
						underlineColor="#2874A6"
						activeUnderlineColor="#2874A6"
						onChangeText={(text) => setExam(text)}
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
				<TouchableWithoutFeedback onPress={() => NotifTime()}>
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
							<Text style={styles.modalText}>Sınav adı boş olamaz</Text>
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

export default AddExamScreen;
