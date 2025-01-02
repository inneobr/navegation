import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import * as tabelaScheme from "@/database/tabelaScheme";

import { DrawerProps } from "@/routes/drawerProps";
import { drizzle } from 'drizzle-orm/expo-sqlite';

import { useSQLiteContext } from 'expo-sqlite';
import { eq } from "drizzle-orm";
import React  from "react";
import { useTheme } from "@/customs";
import { CardVertical } from "@/theme/component";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    id:    number
    title: string,
    color: string,
}

const width = Dimensions.get('window').width;
const CategoriasCard = ({ id, title, color }: Props) => { 
    const navigation = useNavigation<DrawerNavigationProp<DrawerProps>>();
   
    const db = useSQLiteContext();
    const execute  = drizzle(db, { schema: tabelaScheme });  
    
    const handlerDelete = (item: number) => { 
        Alert.alert('', 'Deseja apagar?', [
            { text: "Cancelar" },
            { text: "Confirmar", onPress: () => onDelete(item) },
        ]);
    }

    async function onDelete(item: number){ 
        try {
            const tarefas = await execute.query.tarefa.findMany({ where: ((id, { eq }) => eq(tabelaScheme.tarefa.uuid, Number(item)))});
            for (let tarefa of tarefas) {
                let uuid = Number(tarefa.id);
                await execute.delete(tabelaScheme.image).where(eq(tabelaScheme.image.uuid, uuid));            
                await execute.delete(tabelaScheme.todolist).where(eq(tabelaScheme.todolist.uuid, uuid));
                await execute.delete(tabelaScheme.externos).where(eq(tabelaScheme.externos.uuid, uuid));
                await execute.delete(tabelaScheme.cronometro).where(eq(tabelaScheme.cronometro.uuid, uuid));                
                await execute.delete(tabelaScheme.tarefa).where(eq(tabelaScheme.tarefa.id, uuid));
            }        
            await execute.delete(tabelaScheme.categoria).where(eq(tabelaScheme.categoria.id, item));
        } catch (error) {
            console.log(error);
        }
    }

    function onUpdate(item: number){
        navigation.navigate("CategoriaScreen", {id: id});               
    }

    const theme = useTheme();
    return (
        <CardVertical>            
            <View style={css.container}>
                <View style={{flex: 1}}>
                    <Text style={[css.title, {color: color}]}>{title}</Text> 
                    <View style={{backgroundColor: color}}/>          
                </View>  

                <TouchableOpacity onPress={()=> handlerDelete(id)}>
                    <MaterialIcons name="delete" size={16} color={theme.tint} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> onUpdate(id)}>
                    <MaterialIcons name="edit" size={16} color={theme.tint} />
                </TouchableOpacity>
            </View>
        </CardVertical> 
    )
}
export default CategoriasCard

const css = StyleSheet.create({   
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 1,
        gap: 16
    },

    title: {
        fontSize: 16,
        fontWeight: '500'
    },
})