import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";

import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import * as tabelaScheme from "@/database/tabelaScheme";

import { DrawerProps } from "@/routes/drawerProps";
import { drizzle } from 'drizzle-orm/expo-sqlite';

import { useSQLiteContext } from 'expo-sqlite';
import { eq } from "drizzle-orm";
import React  from "react";
import { useTheme } from "@/customs";

type Props = {
    id:    number
    title: string,
    color: string,
}

const width = Dimensions.get('window').width;
const CategoriasCard = ({ id, title, color }: Props) => { 
    const navigation = useNavigation<DrawerNavigationProp<DrawerProps, 'CategoriaScreen'>>();
    const position = useSharedValue(0);     

    const directionRight = (item: number) => Gesture.Fling()
      .direction(Directions.LEFT)
      .onStart(() => {position.value = withTiming(-width, { duration: 500 })})
      .onEnd(() => {
        onUpdate(item);
        setTimeout(()=> {
            position.value = withTiming(0, { duration: 500 })
        }, 2000); 
      })
    .runOnJS(true);   
  
    const directionLeft = (item: number) => Gesture.Fling()
      .direction(Directions.RIGHT)
      .onStart(() => { position.value = withTiming(width, { duration: 500 })})
      .onEnd(() => {        
        navigation.navigate('AgendaCategoria', { CAT_ID: id}); 
        setTimeout(()=> {
            position.value = withTiming(0, { duration: 500 })
        }, 2000); 
      })
    .runOnJS(true);

    const pressGesture = (item: number) => Gesture
        .LongPress()
        .onTouchesDown(() => {
        
        })
        .onEnd((e, success) => {
        if (success) {
            handlerDelete(item);            
        }
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
            await connect.delete(tabelaScheme.categoria)
            .where(eq(tabelaScheme.categoria.id, item));
        } catch (error) {
            console.log(error);
        }
    }

    function onUpdate(item: number){
        navigation.navigate("CategoriaScreen", {CAT_ID: id});               
    }

    const theme = useTheme();
    return (
        <GestureDetector gesture={Gesture.Exclusive(pressGesture(id) ,directionRight(id), directionLeft(id))} key={id}>
            <Animated.View style={[css.container, {backgroundColor: theme.base }, animatedStyle]}>
                <Text style={[css.title, {color: color}]}>{title}</Text> 
                <View style={{backgroundColor: color}}/>          
            </Animated.View>             
        </GestureDetector> 
    )
}
export default CategoriasCard

const css = StyleSheet.create({   
    container: {
        flexDirection: "row",
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
})