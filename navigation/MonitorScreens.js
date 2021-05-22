import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Monitor screens
import Login from "../MonitorScreens/Login";
import Dashboard from "../MonitorScreens/Dashboard";
import MyJobsView from "../MonitorScreens/MyJobsView";
import MyDocsView from "../MonitorScreens/MyDocsView";
import MyJobDetailsView  from "../MonitorScreens/JobDetails";
import ViewJobEquipment from "../MonitorScreens/ViewJobEquipment";
import ViewEquipmentStatus from "../MonitorScreens/ViewEquipmentStatus";
import ViewJobDocuments from "../MonitorScreens/ViewJobDocuments";
import PDFView from "../MonitorScreens/PDFView";
import MyProfile from "../MonitorScreens/MyProfile";
import UpdatePersonalDetails from "../MonitorScreens/UpdatePersonalDetails";
import Scratchpad from "../MonitorScreens/Scratchpad";
import MonitorNotifications from "../MonitorScreens/MonitorNotifications";

// drawer
import CustomDrawerContent from "./MonitorMenu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");

/**
 * @author CreativeTIM, Chris Bautista
 * @description This file controls the navigation of the app and the screen stacks.
 * There are some unused assets that we've kept that we may use in future iterations of the app.
 */


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DashboardStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Monitor Dashboard"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function MyJobsStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="My Jobs"
                component={MyJobsView}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title="View My Jobs"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Job Details"
                component={MyJobDetailsView}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title= "Job Details"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="View Job Equipment"
                component={ViewJobEquipment}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title= "View Job Equipment"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="View Equipment Status"
                component={ViewEquipmentStatus}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title= "View Equipment Status"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="View Job Documents"
                component={ViewJobDocuments}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title= "View Job Documents"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="View PDF"
                component={PDFView}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title= "View PDF"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
        </Stack.Navigator>
    );
}

function MyDocsStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="My Documents"
                component={MyDocsView}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title="My Documents"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="View PDF"
                component={PDFView}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title= "View PDF"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
        </Stack.Navigator>
    );
}

function MyProfileStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="My Profile"
                component={MyProfile}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title="My Profile"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Update Personal Details"
                component={UpdatePersonalDetails}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title= "Update Personal Details"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
        </Stack.Navigator>
    );
}

function NotificationStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="My Notifications"
                component={MonitorNotifications}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            title="My Notifications"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
        </Stack.Navigator>
    );
}

function ScratchpadStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Scratchpad"
                component={Scratchpad}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Scratchpad"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
        </Stack.Navigator>
    );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen name="Dashboard" component={DashboardStack} />
      <Drawer.Screen name="My Jobs" component={MyJobsStack} />
      <Drawer.Screen name="My Documents" component={MyDocsStack} />
      <Drawer.Screen name="My Profile" component={MyProfileStack} />
      <Drawer.Screen name="My Notifications" component={NotificationStack} />
      <Drawer.Screen name="Scratchpad" component={ScratchpadStack} />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Login}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
