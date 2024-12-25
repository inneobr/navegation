import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { eventosProps } from '@/database/interfacesScheme';

import { View, FlatList, StyleSheet } from 'react-native';
import { EmptyContent } from '@/components/emptyContent';
import * as tabelaScheme from "@/database/tabelaScheme";

import ButtonPlus from '@/components/buttonplus.card';
import TarefasCard from '@/components/tarefas.card';
import { DrawerProps } from '@/routes/drawerProps';

import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';

type routeParams = RouteProp<DrawerProps, 'AdicionarTarefa'>;
type drawerProps =  DrawerNavigationProp<DrawerProps, 'AdicionarTarefa'>;
export default function AgendaCategoriaScreen() { 
  const [database, setDatabase ] = useState<eventosProps[] | any>([]);
  const [reflash,  setReflash  ] = useState(false);

  const route = useRoute<routeParams>(); 
  const navigation = useNavigation<drawerProps>();

  const db = useSQLiteContext();
  const connect  = drizzle(db, { schema: tabelaScheme });

  async function findByCategoria() { 
    try {
        const response = await connect.query.tarefa.findMany({
          where: ((categoria, { eq }) => eq(tabelaScheme.tarefa.categoria, Number(route.params.categoriaID)))
        });           
        setDatabase(response);
    } catch (error) {
        console.log(error)
    }
    setReflash(false);
  } 

  function handlerReflash(){
    setReflash(true);
    findByCategoria();
  }

  function handlerNovo(){
    navigation.navigate('AdicionarTarefa', {tarefaID: null, categoriaID: route.params.categoriaID});       
  }
        
  useFocusEffect(useCallback(() => {
    if(route.params?.categoriaID){      
      findByCategoria();   
    } 
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
          <EmptyContent title={"Lista vazia"} message={"🐕‍🦺 Leve seus pets para passear."}/>
        )}
        refreshing={reflash}
        onRefresh={()=> handlerReflash() }
      />
      <ButtonPlus icon='add' onPress={()=> handlerNovo()}/>
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