import { StyleSheet, Text, View } from "react-native";

import CircularProgress from "react-native-circular-progress-indicator";

const Card = ({ title, value, prediction, symbol, id, color }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.text}>{title} </Text>
      <CircularProgress
        key={id}
        radius={70}
        value={value}
        valueSuffix={symbol}
        progressValueFontSize={24}
        activeStrokeColor={color}
        inActiveStrokeOpacity={0.5}
        progressFormatter={(value) => {
          "worklet";
          return value.toFixed(2);
        }}
      />
      <Text style={styles.text}>
        Next Prediction:
        <Text style={{ fontWeight: "800" }}>
          {" "}
          {prediction.toFixed(2)} {symbol}
        </Text>
      </Text>
    </View>
  );
};
export default Card;
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
    padding: 5,
  },
  display: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: "red",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
