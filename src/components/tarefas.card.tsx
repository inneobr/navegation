import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { Alert, Dimensions, StyleSheet, Text } from "react-native";

import { DrawerNavigationProp } from "@react-navigation/drawer";
import { categoriaProps } from "@/database/interfacesScheme";
import { useNavigation} from "@react-navigation/native";

import * as tabelaScheme from "@/database/tabelaScheme";
import React, { useEffect, useState } from "react";
import { DrawerProps } from "@/routes/drawerProps";

import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import { eq } from "drizzle-orm";

type Props = {
    id:          number
    title:       string,
    description: string,
    categoriaID: number | any
}

type drawerProps =  DrawerNavigationProp<DrawerProps, 'AdicionarTarefa'>;
const width = Dimensions.get('window').width;

const TarefasCard = ({ id, title, description, categoriaID }: Props) => { 
    const [categoria,  setCategoria]  = useState<categoriaProps>();  
    const navigation = useNavigation<drawerProps>();
    const position = useSharedValue(0); 
    

    const directionRight = (item: number) => Gesture.Fling()
      .direction(Directions.LEFT)
      .onStart(() => {position.value = withTiming(-width, { duration: 500 })})
      .onEnd(() => {
        handlerDelete(item);
      })
    .runOnJS(true);   
  
    const directionLeft = (item: number) => Gesture.Fling()
      .direction(Directions.RIGHT)
      .onStart(() => { position.value = withTiming(width, { duration: 500 })})
      .onEnd(() => {        
        onUpdate(item);
      })
    .runOnJS(true);
     
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    const db = useSQLiteContext();
    const connect  = drizzle(db, { schema: tabelaScheme });  
    
    const handlerDelete = (item: number) => { 
        Alert.alert('', 'Deseja apagar?', [
            { text: "Cancelar", onPress: () => position.value = withTiming(0, { duration: 500 }) },
            { text: "Confirmar", onPress: () => onDelete(item) },
        ]);
    }

    async function onDelete(item: number){        
        try {
            await connect.delete(tabelaScheme.tarefa)
            .where(eq(tabelaScheme.tarefa.id, item));
        } catch (error) {
            console.log(error);
        }
    }

    function onUpdate(item: number){
        navigation.navigate('AdicionarTarefa', {tarefaID: item, categoriaID: categoria?.id});  ;
        setTimeout(()=> {
            position.value = withTiming(0, { duration: 500 })
        }, 2000);        
    }
    
    const categoriaDB = drizzle(db, { schema: tabelaScheme }); 
    
    async function getCategoria() { 
        try {
            const response = await categoriaDB.query.categoria.findFirst({
                where: ((id, { eq }) => eq(tabelaScheme.categoria.id, Number(categoriaID)))
            });           
            setCategoria(response);
        } catch (error) {
            console.log(error)
        }
    } 
    
    useEffect(() => {
        getCategoria()
    }, [categoriaID])

    return (
        <GestureDetector gesture={Gesture.Exclusive(directionRight(id), directionLeft(id))} key={id}>           
            <Animated.View style={[css.container, {backgroundColor: '#18181B', paddingHorizontal: 12 }, animatedStyle]}> 
                <Animated.View style={{justifyContent: "space-between", flexDirection: "row"}}>
                    <Text style={[css.title, {color: '#FFFFFF', elevation: 8}]}>{title}</Text>  
                    <Animated.View style={[css.categoria, {backgroundColor: categoria?.color}]}/>                  
                </Animated.View> 
                <Text style={[css.descrition, {color: '#F0F0F0'}]}>{description}</Text>
            </Animated.View>  
            
        </GestureDetector> 
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