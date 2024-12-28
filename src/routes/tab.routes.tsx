import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoriaListScreen from "../screens/categorias.screen";
import AgendaDataScreen from "../screens/agendaDataScreen";

import SettingsScreen from "../screens/settingScreen";
import { Ionicons,  } from "@expo/vector-icons";
import { useTheme } from "@/customs";

export default function TabRouter(){
    const Tab = createBottomTabNavigator();
    const theme = useTheme();
    return (
        <Tab.Navigator 
            screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor:   theme.open,
            tabBarInactiveTintColor: theme.tint,
            sceneStyle: {  //body do app
                backgroundColor: theme.body,
                padding: 14 
            },
            tabBarStyle: {  //menu inferios           
                borderColor:     theme.card,         
                backgroundColor: theme.base,
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