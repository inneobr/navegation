import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { eventosProps } from '@/database/interfacesScheme';

import { View, FlatList, StyleSheet } from 'react-native';
import { EmptyContent } from '@/components/emptyContent';
import * as tabelaScheme from "@/database/tabelaScheme";

import  ButtonPlus from '@/components/buttonplus.card';
import { DrawerProps } from '@/routes/drawerProps';
import { drizzle } from 'drizzle-orm/expo-sqlite';

import TarefasCard from '@/components/tarefas.card';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';

import moment from 'moment';

export default function AgendaHojeScreenScreen() { 
  const navigation = useNavigation<DrawerNavigationProp<DrawerProps, 'AdicionarTarefa'>>(); 
  const [database, setDatabase ] = useState<eventosProps[] | any>([]);
  const [reflash,  setReflash  ] = useState(false);

  const db = useSQLiteContext();
  const connect  = drizzle(db, { schema: tabelaScheme });

  async function findByData() { 
    const date = moment().format('YYYY-MM-DD');
    try {
        const response = await connect.query.tarefa.findMany({
          where: ((data, { eq }) => eq(tabelaScheme.tarefa.data, date))
        });           
        setDatabase(response);
    } catch (error) {
        console.log(error)
    }
    setReflash(false);
  } 

  function handlerReflash(){
    setReflash(true);
    findByData();
  }

  function handlerCadastrarTarefa(){
    navigation.navigate('AdicionarTarefa', {tarefaID: null, categoriaID: null});    
  }
        
  useFocusEffect(useCallback(() => {
    findByData();    
  },[database]))

  return (
    <View style={css.container}>
      <FlatList
        data={database}  
        horizontal = {false}           
        showsVerticalScrollIndicator={false}    
        contentContainerStyle={database.length === 0 ? css.emptySection : css.section}               
        keyExtractor={(item) => String(item.id)}     
        renderItem={({item}) => (                                               
          <TarefasCard id={item.id} title={item.title} description={item.description} categoriaID={item.categoria}/>
        )}
        ListEmptyComponent={() => ( 
            <EmptyContent title={"Agenda vazia"} message={"☀️ Aproveite seu dia"}/>
        )}
        refreshing={reflash}
        onRefresh={()=> handlerReflash() }
      />
      <ButtonPlus icon='add' onPress={()=> handlerCadastrarTarefa()}/>
    </View>    
  );
}

const css = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "column",  
    marginHorizontal: 14,   
    marginVertical: 8,
    flex: 1,
    gap: 6   
  },

  emptySection: {
    justifyContent: "center", 
    borderRadius: 8,
    flex: 1
  },

  section: {
    flexDirection: "column",  
    borderRadius: 8,
    gap: 8
  },
});