import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Loading, Screen } from "../components";
import apiClient from "../api/client";
function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get(
        "https://0z39qetxsl.execute-api.us-east-1.amazonaws.com/prod/all-data"
      );

      setLoading(false);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //sort data
  const sortedData = data
    .slice()
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const formattedData = sortedData?.map((item) => {
    const timeString = item.timestamp;
    const formattedDate = new Date(timeString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const temp = item.predict_temp.toFixed(2);
    const hum = item.predict_hum.toFixed(2);
    return {
      ...item,
      timestamp: formattedDate,
      predict_temp: temp,
      predict_hum: hum,
    };
  });
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.timestamp}</Text>
      <Text style={styles.cell}>{item.predict_temp}</Text>
      <Text style={styles.cell}>{item.predict_hum}</Text>
    </View>
  );
  return (
    <Screen style={styles.container}>
      <View style={styles.headerTopBar}>
        <Text style={styles.headerTopBarText}>Temperature and Humidity </Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.heading}>Time</Text>
        <Text style={styles.heading}>Temperature</Text>
        <Text style={styles.heading}>Humidity</Text>
      </View>
      <Loading visible={loading} />
      <FlatList
        data={formattedData}
        keyExtractor={(item) => item.deviceId}
        renderItem={renderItem}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTopBar: {
    backgroundColor: "#6AB7E2",
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  headerTopBarText: {
    fontSize: 18,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  heading: {
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderRadius: 3,
    borderColor: "#000",
    padding: 10,
    backgroundColor: "#fff",
  },
  cell: {
    fontSize: 15,
    textAlign: "center",
    flex: 1,
    fontWeight: "400",
  },
});

export default History;
