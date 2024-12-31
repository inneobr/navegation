import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { eventosProps } from "@/database/interfacesScheme";
import { EmptyContent } from "@/components/emptyContent";
import * as tabelaScheme from "@/database/tabelaScheme";

import CalendarCard from "@/components/calendar.card";
import ButtonPlus from "@/components/buttonplus.card";
import React, { useCallback, useState } from "react";

import TarefasCard from "@/components/tarefas.card";
import { DrawerProps } from "@/routes/drawerProps";
import { drizzle } from "drizzle-orm/expo-sqlite";

import {  StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useTheme } from "@/customs";

import moment from "moment";

export default function AgendaDataScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerProps, 'AdicionarTarefa'>>(); 
    const [database, setDatabase ] = useState<eventosProps[] | any>([]);
    const [eventos,  setEventos  ] = useState<eventosProps[] | any>([]);
    const [data, setData ] = useState<string>('');
    const theme = useTheme()

    const usql = useSQLiteContext();
    const execute = drizzle(usql, { schema: tabelaScheme });
    
    async function findAll() { 
        try {
            const dados = await execute.query.tarefa.findMany();        
            setDatabase(dados);
        } catch (error) {
            console.log(error)
        }
    } 

    async function findByData() { 
        const date = moment(data).format('YYYY-MM-DD');
        try {
            const response = await execute.query.tarefa.findMany({
              where: ((data, { eq }) => eq(tabelaScheme.tarefa.data, date))
            });           
            setEventos(response);
        } catch (error) {
            console.log(error)
        }
    } 

    useFocusEffect(useCallback(() => {
        findAll(); 
        findByData()   
    },[database, data]));  

    const containerAnimeted = useAnimatedStyle(() => {
        return {  
            backgroundColor: eventos.length === 0 ? theme.card : "transparent",
            borderRadius: 8,
        };
    });
    

    return (
        <View style={css.container}>  
            <CalendarCard tarefas={database} onChange={setData}/>

            <Animated.FlatList
                data={eventos}  
                horizontal = {false}           
                showsVerticalScrollIndicator={false}    
                style={containerAnimeted}
                contentContainerStyle={[css.section, eventos.length === 0 && {flex: 1}]}               
                keyExtractor={(item) => String(item.id)}     
                renderItem={({item}) => (                                               
                    <TarefasCard id={item.id} title={item.title} description={item.description} categoria_id={item.categoria}/>
                )}
                ListEmptyComponent={() => ( 
                    <EmptyContent title={"Data sem eventos"} message={"🗺️ Que tal planejar uma viajem?"}/>
                )}/>
                <ButtonPlus icon='add' onPress={()=> navigation.navigate('AdicionarTarefa', {ID: undefined, CAT_ID: undefined})}/>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "column",
        gap:  8,
        flex: 1
    },

    section: {
        flexDirection: "column",
        justifyContent: "center", 
        borderRadius: 8,
        gap: 8
    }
});