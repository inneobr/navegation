import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
import StackRoutes from "./stack.routes";
import TabRoutes from "./tab.routes";

export default function DrawerRoutes(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Hoje" component={TabRoutes} options={{
                drawerIcon: ({ color, size }) =>  <Ionicons name="compass-outline" color={color} size={size}/>, 
                drawerLabel: "Tarefas para hoje"
            }}/>

            <Drawer.Screen name="Settings" component={StackRoutes} options={{
                drawerIcon: ({ color, size }) =>  <Ionicons name="settings" color={color} size={size}/>, 
                drawerLabel: "Settings"
            }}/>
        </Drawer.Navigator>
    )
}