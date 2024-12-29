import { Alert, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import BotonSheetCard from "@/components/bottomSheet.card";
import ButtonIconCard from "@/components/buttonIcon.card";
import ButtonSaveCard from "@/components/buttonSave.card";

import * as tabelaScheme from "@/database/tabelaScheme";
import React, { useCallback, useState } from "react";
import { InputCard } from "@/components/input.card";

import { DrawerProps } from "@/routes/drawerProps";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { eq } from "drizzle-orm";
import moment from "moment";
import { useTheme } from "@/customs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
export default function TarefaScreen() {   
  const [title,       setTitle       ] = useState<string | any>('');
  const [description, setDescription ] = useState<string | any>('');
  const [hora,        setHora        ] = useState<string | any>('');
  const [prioridade,  setPrioridade  ] = useState<string | any>('baixa');  
  const [data,        setData        ] = useState<string | any>(moment().format('YYYY-MM-DD'));

  const { width } = useWindowDimensions();    
  const route = useRoute<RouteProp<DrawerProps, 'AdicionarTarefa'>>();
  const navigation = useNavigation();
  

  const usql = useSQLiteContext();
  const execute = drizzle(usql, { schema: tabelaScheme });
 
  async function onSave() {
    if(route.params.ID) return onUpdate()
    if(!title ) {  return Alert.alert("Atenção!", "Nome é obrigatorio.")}  
    if(data < moment().format('YYYY-MM-DD')){
        return Alert.alert("Atenção!", "Não é possivel cadastrar tarefas no passado") 
    }     
    try {             
      await execute.insert(tabelaScheme.tarefa)
        .values({title, description, prioridade, data, hora, categoria_id: route.params?.CAT_ID });  
    } catch (error) {
      console.log(error);
    }
    tarefaClear();    
  }

  async function onUpdate() {
    if(!title ) { 
        return Alert.alert("Atenção!", "Nome é obrigatório.")
    }
    try {  
        await execute.update(tabelaScheme.tarefa).set({title, description, data})
          .where(eq(tabelaScheme.tarefa.id, Number(route.params.ID)));                    
    } catch (error) {
        console.log(error);
    }
    tarefaClear();
  }

  async function findByID() {
    try {
        const response = await execute.query.tarefa.findFirst({
            where: ((id, { eq }) => eq(tabelaScheme.tarefa.id, Number(route.params?.ID)))
        });           
        setTitle(response?.title);
        setDescription(response?.description);
        setHora(response?.hora);
        setData(response?.data);
        setPrioridade(response?.prioridade);
    } catch (error) {
        console.log(error)
    }
  }

  function tarefaClear(){
    setTitle('');
    setHora('');
    setPrioridade('');  
    setDescription('');
    setData(moment().format('YYYY-MM-DD'));
    navigation.goBack();
  }
 
  useFocusEffect(useCallback(() => {
    if(route.params?.ID){
      findByID();
    }
  },[route.params]));    

  const theme = useTheme()
  return (
    <React.Fragment>
      <View style={[css.container, {width: width - 28, backgroundColor: theme.card}]}>
        <InputCard placeholder={"Nome"} value={title} onChangeText={setTitle} />
        <InputCard placeholder={"Descrição"} value={description} onChangeText={setDescription} multiline />      
        <ButtonSaveCard icon={'save'} title='Salvar' onPress={() => onSave()}/>  
      </View> 
      <BotonSheetCard  onChange={setData}/>
      </React.Fragment>
  )
}

const css = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingTop: 40,
    padding: 20,
    margin: 14,
    gap: 20,
  },
})