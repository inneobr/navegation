import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { categoriaProps } from "@/database/interfacesScheme";
import CategoriasCard from "@/components/categorias.card";
import { EmptyContent } from "@/components/emptyContent";

import * as tabelaScheme from "@/database/tabelaScheme";
import TopTitleCard from "@/components/topTitle.card";
import ButtonPlus from "@/components/buttonplus.card";

import { DrawerProps } from "@/routes/drawerProps";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

import { useCallback, useState } from "react";

export default function CategoriaListScreen(){
    const [categorias, setCategorias] = useState<categoriaProps[]>([]);
    const navigation = useNavigation<DrawerNavigationProp<DrawerProps, 'CategoriaScreen'>>();

    const db = useSQLiteContext();
    const connect = drizzle(db, { schema: tabelaScheme });     

    async function fetchData() { 
        try {   
            const response = await connect.query.categoria.findMany();            
            setCategorias(response);
        } catch (error) {
            console.log(error)
        }
    } 

    useFocusEffect(useCallback(() => {
        fetchData();    
      },[categorias]))

    return (
        <View style={css.container}>
            <TopTitleCard title={'Menu tarefas pessoais'}/>
            <FlatList
                data={categorias}  
                horizontal = {false}           
                showsVerticalScrollIndicator={false}
                contentContainerStyle={categorias.length === 0 ? css.emptySection : css.section}               
                keyExtractor={(item) => String(item.id)}     
                renderItem={({item}) => (                                               
                <CategoriasCard id={item.id} title={item.title} color={item.color}/>
                )}
                ListEmptyComponent={() => ( 
                    <EmptyContent title={"Ainda não temos listas."} message={"Cadastre listas e organize suas tarefas."}/>
                )}
            />
            <ButtonPlus icon='add' onPress={()=> navigation.navigate("CategoriaScreen", { categoriaID: 0})}/>
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