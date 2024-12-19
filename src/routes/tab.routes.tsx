import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/home";
import Tarefas from "../screens/tarefas";
import Settings from "../screens/settings";
import { Ionicons,  } from "@expo/vector-icons";

export default function TabRoutes(){
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} options={{ 
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) =>  <Ionicons name="compass-outline" color={color} size={size}/> 
            }}/>
            
            <Tab.Screen name="Tarefas" component={Tarefas} options={{ 
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) =>  <Ionicons name="calendar" color={color} size={size}/> 
            }}/>

            <Tab.Screen name="Settings" component={Settings} options={{ 
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) =>  <Ionicons name="settings" color={color} size={size}/> 
            }}/>
        </Tab.Navigator>
    )
}