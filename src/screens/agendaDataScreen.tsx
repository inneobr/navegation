import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { eventosProps } from "@/database/interfacesScheme";
import { FlatList, StyleSheet, View } from "react-native";
import { EmptyContent } from "@/components/emptyContent";

import * as tabelaScheme from "@/database/tabelaScheme";
import CalendarCard from "@/components/calendar.card";
import ButtonPlus from "@/components/buttonplus.card";

import React, { useCallback, useState } from "react";
import TarefasCard from "@/components/tarefas.card";
import { DrawerProps } from "@/routes/drawerProps";

import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

import moment from "moment";

export default function AgendaDataScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerProps, 'AdicionarTarefa'>>(); 
    const [database, setDatabase ] = useState<eventosProps[] | any>([]);
    const [eventos,  setEventos  ] = useState<eventosProps[] | any>([]);
    const [data, setData ] = useState<string>('');

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
    
    return (
        <View style={css.container}>  
            <CalendarCard tarefas={database} onChange={setData}/>

            <FlatList
                data={eventos}  
                horizontal = {false}           
                showsVerticalScrollIndicator={false}    
                contentContainerStyle={[css.section, {backgroundColor: '#18181B'} , eventos.length === 0? {flex: 1, justifyContent: "center"}: null]}               
                keyExtractor={(item) => String(item.id)}     
                renderItem={({item}) => (                                               
                    <TarefasCard id={item.id} title={item.title} description={item.description} categoriaID={item.categoria}/>
                )}
                ListEmptyComponent={() => ( 
                    <EmptyContent title={"Data sem eventos"} message={"🗺️ Que tal planejar uma viajem?"}/>
                )}/>
                <ButtonPlus icon='add' onPress={()=> navigation.navigate('AdicionarTarefa', {tarefaID: undefined, categoriaID: undefined})}/>
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
    borderRadius: 8,
    gap: 8
  },
});