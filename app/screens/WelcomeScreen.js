import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Screen } from "../components";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <Screen style={styles.container}>
      <View style={{ marginVertical: 8 }}>
        <Text
          style={{
            fontSize: wp(11),
            textAlign: "center",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          SMART FIELD
        </Text>
        <Text
          style={{
            fontSize: wp(4),
            textAlign: "center",
            letterSpacing: 1,
            fontWeight: 800,
            color: "#000",
          }}
        >
          For Monitoring
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={{
            uri: "https://res.cloudinary.com/dluwcubyw/image/upload/v1705887191/capstone/crop-monitoring-via-mobile-device_mkgwml.png",
          }}
          style={{ width: wp(75), height: wp(75) }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          backgroundColor: "#34a0a4",
          marginHorizontal: 5,
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            fontSize: wp(6),
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          GET STARTED
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",

    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
});
