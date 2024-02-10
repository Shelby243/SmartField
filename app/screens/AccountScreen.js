import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Screen, ListItem, Icon, ListItemSeparator } from "../components";
import colors from "../config/colors";
import { AppContext } from "../context/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const menuItems = [
  {
    title: "Notifications",
    icon: {
      name: "email",
      backgroundColor: "#4ecdc4",
    },
    targetScreen: "Messages",
  },
];
const AccountScreen = ({ navigation }) => {
  const { login, setLogin } = useContext(AppContext);
  const handleLogout = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      setLogin(false);
      console.log("Local storage cleared successfully.");
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem image="" title="" subTitle="programming@gmail.com" />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Logout"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogout}
      />
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
