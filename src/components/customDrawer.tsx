import { DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationProp } from "@react-navigation/drawer";
import { Alert,  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { categoriaProps } from "@/database/interfacesScheme";
import { useNavigation } from "@react-navigation/native";
import * as tabelaScheme from "@/database/tabelaScheme";

import { DrawerProps } from "@/routes/drawerProps";
import { MaterialIcons } from "@expo/vector-icons";
import { drizzle } from "drizzle-orm/expo-sqlite";

import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { eq } from "drizzle-orm";

type drawerProps =  DrawerNavigationProp<DrawerProps, 'AgendaCategoria'>;
export default function DrawerContent(props: any) { 
    const [categorias, setCategoria] = useState<categoriaProps[]>([]);          
    const navigation = useNavigation<drawerProps>(); 

    const filter = props.state.routes.filter(
        (route: any) => route.name!== 'null'      
    );  

    const data = { ...props, state: { ...props.state, routes: filter }};
    function handlerCategoriaList(event: number){ 
        navigation.navigate('AgendaCategoria', { categoriaID: event});        
    }  
    
    const db = useSQLiteContext();
    const connect = drizzle(db, { schema: tabelaScheme });     

    async function fetchData() { 
        try {   
            const response = await connect.query.categoria.findMany();            
            setCategoria(response);
        } catch (error) {
            console.log(error)
        }
    } 

    const longGesture = (id: number) => Gesture.LongPress()
        .onBegin(() => {
            
        })
        .onEnd((e, success) => {
            if (success) {                
                handlerDelete(id)
            }
        })        
    .runOnJS(true);       
  
    function handlerDelete(item: number){ 
        Alert.alert('', 'Deseja apagar?', [
            { text: "Cancelar"},
            { text: "Confirmar", onPress: () => onDelete(item) },
        ]);
    }
    
    async function onDelete(item: number): Promise<void> {  
        try {
            await connect.delete(tabelaScheme.categoria)
                .where(eq(tabelaScheme.categoria.id, item));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [categorias]);

    

    return (
        <View style={css.container}>   
            <DrawerContentScrollView {...props} scrollEnabled={true}> 
                <DrawerItemList {...data} />
                {categorias.map((route) => {
                    return (
                        <GestureDetector gesture={longGesture(route.id)} key={route.id}> 
                            <DrawerItem key={route.id} 
                                icon={()    => (<MaterialIcons name='menu' color={'#FFF'} size={24}/> )}
                                label={()   => (<Text style={{color: '#FFF', fontSize: 16}}>{route.title}</Text>)}                           
                                onPress={() => handlerCategoriaList(route.id)}
                            />              
                        </GestureDetector>                    
                    )
                })}                       
            </DrawerContentScrollView>  
            
            <View style={css.footer}>                
                <TouchableOpacity onPress={() => navigation.navigate("CategoriaScreen", {categoriaID: 0})}>
                    <View style={css.buttom}>
                        <MaterialIcons name="add" color={'#FFF'} size={22}/>
                        <Text style={{color: '#FFF'}}>Adicionar lista</Text>  
                    </View>
                </TouchableOpacity>   

                <TouchableOpacity onPress={() => navigation.navigate("SettingsOpen")}>
                    <MaterialIcons name="menu" color={'#FFF'} size={22}/>
                </TouchableOpacity>         
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1
    },
    footer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:  "center",
        paddingHorizontal: 14,
        paddingVertical: 40,
    },

    buttom: {
        flexDirection: "row",
        alignItems:  "center",
    }
});