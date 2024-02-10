import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AppContext } from "../context/appContext";
import { Screen } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser, setLogin } = useContext(AppContext);
  const handleNavigate = async () => {
    if (!username || !password) {
      setError("Please fill in both username and password.");
    } else {
      setError("");
      await AsyncStorage.setItem("login", "true");
      await AsyncStorage.setItem("user", username);
      setLogin(true);
      setUser(username);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dluwcubyw/image/upload/v1705887191/capstone/crop-monitoring-via-mobile-device_mkgwml.png",
            }}
            style={{ width: wp(60), height: wp(60) }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="white"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleNavigate}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <Text style={{ color: "black" }}>Don't have an account?</Text>
          <Text style={{ color: "red", marginTop: 10 }} onPress={() => ""}>
            Sign up
          </Text>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  inputContainer: {
    position: "absolute",
    top: "40%",
    width: "100%",
    left: "7%",
  },
  logo: {
    position: "absolute",
    top: "1%",
    width: "100%",
    left: "20%",
  },
  input: {
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginBottom: 10,
    color: "white",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: "16%",
    width: "100%",
    left: "7%",
    alignItems: "center",
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#2D3250",
    borderRadius: 15,
    marginVertical: 10,
    width: "80%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default Login;
