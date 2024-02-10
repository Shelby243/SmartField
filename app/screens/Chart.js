import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { HumChart, Screen, TempChart } from "../components";

const Chart = () => {
  const [type, setType] = useState(true);
  return (
    <Screen style={styles.container}>
      <View style={{ padding: 5, marginVertical: 40 }}>
        <TouchableOpacity
          onPress={() => setType(!type)}
          style={{
            backgroundColor: type ? "#880808" : "#0096FF",
            marginHorizontal: 20,
            padding: 15,
            borderRadius: 16,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            }}
          >
            {type ? "Humidity" : "Temperature"}
          </Text>
        </TouchableOpacity>
      </View>

      {type ? <TempChart /> : <HumChart />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Chart;
