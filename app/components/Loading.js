import React from "react";
import { Text, StyleSheet } from "react-native";
import Screen from "./Screen";

function Loading({ visible = false }) {
  if (!visible) return null;
  return (
    <Screen style={styles.container}>
      <Text style={styles.text}>Loading ...</Text>
    </Screen>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
