import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

import { DrawerNavigationProp } from "@react-navigation/drawer";
import { categoriaProps } from "@/database/interfacesScheme";
import { useNavigation} from "@react-navigation/native";

import * as tabelaScheme from "@/database/tabelaScheme";
import React, { useEffect, useState } from "react";
import { DrawerProps } from "@/routes/drawerProps";

import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import { useTheme } from "@/customs";

type Props = {
    id:          number
    title:       string,
    description: string,
    categoria_id: number | any
}

type drawerProps =  DrawerNavigationProp<DrawerProps, 'AdicionarTarefa'>;
const width = Dimensions.get('window').width;

const TarefasCard = ({ id, title, description, categoria_id }: Props) => { 
    const [categoria,  setCategoria]  = useState<categoriaProps>();  
    const navigation = useNavigation<drawerProps>();

    const handlerTarefa = () => {
        navigation.navigate('TarefaViewScreen', { id: id });        
    }

    const db = useSQLiteContext();
    const execute = drizzle(db, { schema: tabelaScheme }); 
    
    async function getCategoria() { 
        try {
            const response = await execute.query.categoria.findFirst({
                where: ((id, { eq }) => eq(tabelaScheme.categoria.id, Number(categoria_id)))
            });           
            setCategoria(response);
        } catch (error) {
            console.log(error)
        }
    } 
            
    useEffect(() => {
        getCategoria()
    }, [categoria_id])

    const theme = useTheme()
    return (
        <TouchableOpacity onPress={()=> handlerTarefa()}>        
            <Animated.View style={[css.container, {backgroundColor: theme.card, paddingHorizontal: 12 }]}> 
                <Animated.View style={{justifyContent: "space-between", flexDirection: "row"}}>
                    <Text style={[css.title, {color: theme.font, elevation: 8}]}>{title}</Text>
                    <Animated.View style={[css.categoria, {backgroundColor: categoria?.color}]}/>     
                </Animated.View> 
            </Animated.View> 
        </TouchableOpacity>   
    )
}
export default TarefasCard

const css = StyleSheet.create({   
    container: {
        borderRadius: 8,
        elevation: 2,
        padding: 14,
        flex: 1,
        gap: 3
    },

    title: {
        fontSize: 16,
        fontWeight: '500'
    },

    descrition: {
        fontSize: 12
    },

    categoria: {
        borderRadius: 5,
        width:  8,
        height: 8 
    }
})