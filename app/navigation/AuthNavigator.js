import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { Login, WelcomeScreen } from "../screens";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
const styles = StyleSheet.create({});
