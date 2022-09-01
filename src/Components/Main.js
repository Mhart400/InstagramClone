import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../Redux/userSlice";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Settings from "./main/Settings";
import Feed from "./main/Feed";

export default function Main() {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  // Update the state with userData
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const EmptyScreen = () => {
    return null;
  };

  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "tomato", height: 90 }}
      labeled={false}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddContainer"
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
        component={EmptyScreen}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
