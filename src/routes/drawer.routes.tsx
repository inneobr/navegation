import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "@/components/customDrawer";
import { Ionicons } from "@expo/vector-icons";

import AgendaCategoriaScreen from "@/screens/agendaCategoriaScreen";
import AgendaHojeScreenScreen from "@/screens/agendaHojeScreen";
import CronometroScreen from "@/screens/cronometroScreen";
import TarefaViewScreen from "@/screens/tarefaViewScreen";
import CategoriaScreen from "@/screens/categoriaScreen";
import TarefaScreen from "@/screens/tarefaScreen";
import TabRouter from "./tab.routes";
import { useTheme } from "@/customs";

const Drawer = createDrawerNavigator();
export default function DrawerRoutes(){
    const theme = useTheme();
    return (
        <Drawer.Navigator  drawerContent={DrawerContent} screenOptions={{ 
            headerShown: false, 
            drawerActiveTintColor:         theme.open,
            drawerInactiveTintColor:       theme.tint,
            drawerActiveBackgroundColor:   'transparent',
            drawerInactiveBackgroundColor: 'transparent',            
            sceneStyle: {                
                backgroundColor: theme.body, /** cores do body quando usa drawer **/
            }, 
            drawerStyle: {  
                backgroundColor: theme.card, 
                marginBottom: 14, 
                marginTop: 14,
                width: "60%",
            }}}>   

            <Drawer.Screen 
                name="AgendaHoje" 
                component={AgendaHojeScreenScreen} 
                options={{
                    drawerLabel: "Agenda hoje",
                    drawerIcon: ({ color, size }) => <Ionicons name="calendar-number-outline" color={color} size={size} />
                }} 
            /> 

            <Drawer.Screen 
                name="AgendaCategoria" 
                component={AgendaCategoriaScreen} 
                options={{
                    drawerLabel: "Últimas categoria",
                    drawerIcon: ({ color, size }) => <Ionicons name="add" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            /> 

            <Drawer.Screen 
                name="CategoriaScreen" 
                component={CategoriaScreen} 
                options={{
                    drawerLabel: "Adicionar lista",
                    drawerIcon: ({ color, size }) => <Ionicons name="folder" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            /> 

            <Drawer.Screen 
                name="CronometroScreen" 
                component={CronometroScreen} 
                options={{
                    drawerLabel: "Cronometro",
                    drawerIcon: ({ color, size }) => <Ionicons name="time" color={color} size={size} />
                }} 
            /> 

            <Drawer.Screen 
                name="AdicionarTarefa" 
                component={TarefaScreen} 
                options={{
                    drawerLabel: "Adicionar tarefa",
                    drawerIcon: ({ color, size }) => <Ionicons name="document" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            /> 

            <Drawer.Screen 
                name="TarefaViewScreen" 
                component={TarefaViewScreen} 
                options={{
                    drawerLabel: "TarefaViewScreen",
                    drawerIcon: ({ color, size }) => <Ionicons name="open" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            /> 

            <Drawer.Screen 
                name="SettingsOpen" 
                component={TabRouter} 
                options={{
                    drawerLabel: "Settings",
                    drawerIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            />  

            
                
        </Drawer.Navigator>
    )
}