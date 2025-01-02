import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import ButtonSaveCard from '@/components/buttonSave.card';
import * as tabelaScheme from "@/database/tabelaScheme";

import PickColorCard from '@/components/pickColor.card';
import { View, Alert, StyleSheet, BackHandler } from 'react-native';
import { InputCard } from "@/components/input.card";

import { DrawerProps } from '@/routes/drawerProps';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';

import { useCallback, useState } from 'react';
import { useTheme } from '@/customs';
import { eq } from 'drizzle-orm';

export default function CadastrarCategoria() {
  const route = useRoute<RouteProp<DrawerProps, 'CategoriaScreen'>>();
  const [ color, setColor ] = useState<string | any>('');    
  const [ title, setTitle ] = useState<string | any>('');
  const navigation = useNavigation();

  const usql = useSQLiteContext();
  const execute = drizzle(usql, { schema: tabelaScheme });

  async function onSave() {
    if(route.params.id) return onUpdate()
    if(!title ) { return Alert.alert("Atenção!", "Nome é obrigatorio.")}
    try {             
      await execute.insert(tabelaScheme.categoria).values({title, color});      
    } catch (error) {
      if(error = "Caused by: Error code ‼: UNIQUE constraint failed: categoria.title]"){
        Alert.alert("Atenção", "Encontramos uma lista com mesmo nome, escolha outro e tente novamente.");
      }else{
          Alert.alert("Atenção", `Tivemos um problema: ${error}`);
          console.log(error);
      }      
    }
    handlerClose()
  }

  async function onUpdate() {
      if(!title ) { 
          return Alert.alert("Atenção!", "Nome é obrigatório.")
      }
      try {  
          await execute.update(tabelaScheme.categoria).set({title, color})
            .where(eq(tabelaScheme.categoria.id, Number(route.params.id)));                    
      } catch (error) {
          console.log(error);
      }
      handlerClose()
    }

  async function findByID() {
      try {
          const response = await execute.query.categoria.findFirst({
              where: ((id, { eq }) => eq(tabelaScheme.categoria.id, Number(route.params?.id)))
          });           
          setTitle(response?.title);
          setColor(response?.color)
      } catch (error) {
          console.log(error)
      }
  }

  const handlerColor = (props: string) => {    
    if(props === color){ setColor('');
    } else{ setColor(props)}
  }

  const handlerClose = () => {
    setTitle('');
    setColor('');
    navigation.goBack();
  }

  
  useFocusEffect(useCallback(() => {
    if(route.params?.id){
      findByID();
    }
  },[route.params]));  

  const theme = useTheme();

  const backAction = () => {
      handlerClose();
      return true;
    };
    
    BackHandler.addEventListener(
      'hardwareBackPress', 
      backAction
    );
  return (
    <View style={[css.container, {backgroundColor: theme.card }]}>      
      <InputCard placeholder={"Nome da lista"} value={title} onChangeText={setTitle}/>
      <PickColorCard filter={color} onChange={handlerColor}/>
      <ButtonSaveCard icon={'save'} title='Salvar' onPress={() => onSave()}/> 
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 8,
    paddingTop: 40,
    padding: 14,
    margin: 8,
    gap: 30
  },
  input: {
      borderRadius: 6,
      borderWidth: 1,
      padding: 8,
  },

  colors: {        
      borderRadius: 8,
      padding: 8
  }
});
