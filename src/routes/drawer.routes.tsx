import AgendaCategoriaScreen from "@/screens/agendaCategoriaScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AgendaHojeScreenScreen from "@/screens/agendaHojeScreen";
import CategoriaListScreen from "@/screens/categorias.screen";
import AgendaDataScreen from "@/screens/agendaDataScreen";

import TarefaViewScreen from "@/screens/tarefaViewScreen";
import CronometroScreen from "@/screens/cronometroScreen";
import { useNavigation } from "@react-navigation/native";

import CategoriaScreen from "@/screens/categoriaScreen";
import DrawerContent from "@/components/customDrawer";
import GalleryScreen from "@/screens/imageScreen";

import TarefaScreen from "@/screens/tarefaScreen";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/customs";

const Drawer = createDrawerNavigator();
export default function DrawerRoutes(){
    const navigation = useNavigation();
    const theme = useTheme();
    return (
        <Drawer.Navigator  drawerContent={DrawerContent} screenOptions={{ 
            drawerActiveTintColor:         theme.open,
            drawerInactiveTintColor:       theme.tint,
            drawerActiveBackgroundColor:   'transparent',
            drawerInactiveBackgroundColor: 'transparent', 
            headerTintColor: theme.font,            
            headerStyle: {
                backgroundColor: theme.base,                
            },  
            headerTitleStyle: {
                color: theme.font
            },    
            sceneStyle: {                
                backgroundColor: theme.body, 
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
                    headerTitle:"Hoje",
                    drawerLabel: "Agenda hoje",
                    drawerIcon: ({ color, size }) => <Ionicons name="calendar-number-outline" color={color} size={size} />
                }} 
            /> 

            <Drawer.Screen 
                name="AgendaCategoria" 
                component={AgendaCategoriaScreen}                 
                options={{
                    headerTitle:"Filtrados",
                    drawerLabel: "Últimas categoria",
                    drawerIcon: ({ color, size }) => <Ionicons name="add" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            /> 

            <Drawer.Screen 
                name="AgendaDataScreen" 
                component={AgendaDataScreen} 
                options={{                    
                    headerTitle:"Calendário",
                    drawerLabel: "Calendário",
                    drawerIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />                    
                }}                 
            /> 

            <Drawer.Screen 
                name="CategoriaScreen" 
                component={CategoriaScreen} 
                options={{                    
                    headerTitle:"Lista",
                    drawerLabel: "Adicionar lista",
                    drawerIcon: ({ color, size }) => <Ionicons name="folder" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                    
                }}                 
            /> 

            <Drawer.Screen 
                name="CronometroScreen" 
                component={CronometroScreen} 
                options={{
                    headerTitle:"Cronomêtro",
                    drawerLabel: "Cronomêtro",
                    drawerIcon: ({ color, size }) => <Ionicons name="time" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            /> 

            <Drawer.Screen 
                name="GalleryScreen" 
                component={GalleryScreen} 
                options={{
                    headerTitle:"Galeria",
                    drawerLabel: "GalleryScreen",
                    drawerIcon: ({ color, size }) => <Ionicons name="image" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            /> 
            
            
            <Drawer.Screen 
                name="AdicionarTarefa" 
                component={TarefaScreen} 
                options={{ 
                    headerTitle:"Tarefa",
                    drawerLabel: "Adicionar tarefa",
                    drawerIcon: ({ color, size }) => <Ionicons name="document" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }                
                }} 
            /> 

            <Drawer.Screen 
                name="TarefaViewScreen" 
                component={TarefaViewScreen} 
                options={{
                    headerTitle:"Tarefa",
                    drawerLabel: "Tarefa",
                    drawerIcon: ({ color, size }) => <Ionicons name="open" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            /> 

            <Drawer.Screen 
                name="CategoriaListScreen" 
                component={CategoriaListScreen}
                options={{
                    headerTitle:"Listas",
                    drawerLabel: "Listas",
                    drawerIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
                    drawerItemStyle: { display: 'none' }
                }} 
            />  

            
                
        </Drawer.Navigator>
    )
}