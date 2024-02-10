import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator, AuthNavigator } from "./app/navigation";
import { Login, Register, WelcomeScreen } from "./app/screens";
import { useEffect, useState } from "react";
import { AppContext } from "./app/context/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");

  const checkLoginStatus = async () => {
    const storedLogin = await AsyncStorage.getItem("login");
    setLogin(storedLogin === "true");
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  return (
    <NavigationContainer>
      <AppContext.Provider value={{ login, setLogin, user, setUser }}>
        {login ? <AppNavigator /> : <AuthNavigator />}
      </AppContext.Provider>
    </NavigationContainer>
  );
}
