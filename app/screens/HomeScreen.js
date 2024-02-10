import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch, ScrollView } from "react-native";

import apiClient from "../api/client";
import { Screen, Card, Loading } from "../components";
import { AppContext } from "../context/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

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
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const switchStatus = isEnabled ? "ON" : "OFF";
  const fetchUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      setUser("Unknown");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //sort data
  const sortedData = data
    .slice()
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  return (
    <Screen style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Text style={styles.text}>Welcome {user} </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            padding: 20,
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 15,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            Water pump ({switchStatus}){" "}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <Loading visible={loading} />
      <ScrollView style={styles.container}>
        {sortedData?.map((item, index) => (
          <React.Fragment key={item.deviceId}>
            {index === data.length - 1 && (
              <Card
                id={index}
                title="Temperature(Current)"
                prediction={item.predict_temp}
                symbol="°C"
                value={item.current_temp}
                color="#c0392b"
              />
            )}
          </React.Fragment>
        ))}
        {sortedData?.map((item, index) => (
          <React.Fragment key={item.deviceId}>
            {index === data.length - 1 && (
              <Card
                id={index}
                title="Humidy(Current)"
                prediction={item.predict_hum}
                symbol="%"
                value={item.current_hum}
                color="#2ecc71"
              />
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </Screen>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#d3d3d3",
  },
  content: {
    flex: 6,
    backgroundColor: "#fff",
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  content2: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
  },
});
