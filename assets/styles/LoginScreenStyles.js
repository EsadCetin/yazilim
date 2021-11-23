import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	image: {
		width: windowWidth / 2,
		height: windowHeight / 3.8,
		alignSelf: "center",
		marginTop: windowHeight / 10,
	},
	input: { padding: 15 },
	appName: {
		fontSize: 20,
		position: "absolute",
		alignSelf: "center",
		marginTop: windowHeight / 20,
		zIndex: 1,
		fontFamily: "PoppinsMedium",
	},
	button: {
		alignSelf: "center",
		alignItems: "center",
		backgroundColor: "#26a3e5",
		width: "50%",
		height: "8%",
		marginTop: 10,
		justifyContent: "center",
		borderRadius: 10,
	},
	text: {
		fontSize: 22,
		color: "white",
	},
	button2: {
		marginTop: "5%",
	},
	text2: {
		alignSelf: "center",
		fontSize: 22,
		color: "black",
		textDecorationLine: "underline",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	ReadButton: {
		borderRadius: 10,
		padding: 10,
		elevation: 2,
		backgroundColor: "#26a3e5",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: "10%",
		textAlign: "center",
	},
});
