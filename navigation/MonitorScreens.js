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

import Home from "../templatescreens/Home";
import Profile from "../templatescreens/Profile";
import Register from "../templatescreens/Register";
import Elements from "../templatescreens/Elements";
import Articles from "../templatescreens/Articles";
import Beauty from "../templatescreens/Beauty";
import Category from "../templatescreens/Category";
import Fashion from "../templatescreens/Fashion";
import Product from "../templatescreens/Product";
import Gallery from "../templatescreens/Gallery";
import Chat from "../templatescreens/Chat";
import Search from "../templatescreens/Search";
import Cart from "../templatescreens/Cart";
// settings
import SettingsScreen from "../templatescreens/Settings";
import AgreementScreen from "../templatescreens/Agreement";
import PrivacyScreen from "../templatescreens/Privacy";
import AboutScreen from "../templatescreens/About";
import NotificationsScreen from "../templatescreens/Notifications";
// Notifications
import MonitorNotifications from "../MonitorScreens/MonitorNotifications";
import SystemNotifications from "../templatescreens/SystemNotifications";

// drawer
import CustomDrawerContent from "./MonitorMenu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";
import About from "../templatescreens/About";

const { width } = Dimensions.get("screen");

/**
 * @author CreativeTIM, Chris Bautista
 * @description This file controls the navigation of the app and the screen stacks.
 * There are some unused assets that we've kept that we may use in future iterations of the app.
 */


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function NotificationsStack(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Personal") {
            iconName = "user";
          } else if (route.name === "System") {
            iconName = "database";
          }
          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              family="entypo"
              size={22}
              color={color}
              style={{ marginTop: 10 }}
            />
          );
        }
      })}
      tabBarOptions={{
        activeTintColor: argonTheme.COLORS.PRIMARY,
        inactiveTintColor: "gray",
        labelStyle: {
          fontFamily: "open-sans-regular"
        }
      }}
    >
      <Tab.Screen name="Personal" component={MonitorNotifications} />
      <Tab.Screen name="System" component={SystemNotifications} />
    </Tab.Navigator>
  );
}

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Agreement"
        component={AgreementScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Agreement"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Privacy"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="About" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
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

function HomeStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Home"
                            search
                            options
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Beauty"
                component={Beauty}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Beauty"
                            back
                            tabs={tabs.beauty}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Category"
                component={Category}
                options={{
                    header: ({ navigation, scene }) => {
                        const { params } = scene.descriptor;
                        const title = (params && params.headerTitle) || "Category";
                        return (<Header title={title} back navigation={navigation} scene={scene} />);
                    },
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Fashion"
                component={Fashion}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Fashion"
                            back
                            tabs={tabs.fashion}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Product"
                component={Product}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title=""
                            back
                            white
                            transparent
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="Gallery"
                component={Gallery}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            transparent
                            white
                            title=""
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Rachel Brown"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Search" back navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Shopping Cart"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationsStack}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Notifications"
                            back
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

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

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
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Search" back navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Notifications"
              back
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
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Account" component={Register} />
      <Drawer.Screen name="Elements" component={ElementsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
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
