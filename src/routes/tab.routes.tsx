import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoriaListScreen from "../screens/categorias.screen";
import AgendaDataScreen from "../screens/agendaDataScreen";

import SettingsScreen from "../screens/settingScreen";
import { Ionicons,  } from "@expo/vector-icons";

export default function TabRouter(){
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator 
            screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor:   '#FFFFFF',
            tabBarInactiveTintColor: '#F0F0F0',
            sceneStyle: {  //body do app
                backgroundColor: '#27272A',
                padding: 14 
            },
            tabBarStyle: {  //menu inferios           
                borderColor:     '#18181B',         
                backgroundColor: '#18181B',
            }}}> 

            <Tab.Screen name="AgendaDataScreen" component={AgendaDataScreen} 
                options={{ 
                title: "AgendaDataScreen",
                tabBarLabel: "AgendaDataScreen",  
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) =>  <Ionicons name="calendar" color={color} size={size}/> 
            }}/>

            <Tab.Screen name="CategoriaListScreen" component={CategoriaListScreen} 
                options={{ 
                title: "CategoriaListScreen",
                tabBarLabel: "CategoriaListScreen",  
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size}/> 
            }}/>

            <Tab.Screen name="Settings" component={SettingsScreen} 
                options={{ 
                title: "SettingsScreen",
                tabBarLabel: "SettingsScreen",  
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) =>  <Ionicons name="settings" color={color} size={size}/> 
            }}/>
        </Tab.Navigator>
    )
}