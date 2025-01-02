import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import BotonSheetCard from "@/components/bottomSheet.card";
import ButtonSaveCard from "@/components/buttonSave.card";

import * as tabelaScheme from "@/database/tabelaScheme";
import React, { useCallback, useEffect, useState } from "react";
import { InputCard } from "@/components/input.card";

import { DrawerProps } from "@/routes/drawerProps";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { CardVertical } from "@/theme/component";

import { useSQLiteContext } from "expo-sqlite";
import { Alert, BackHandler } from "react-native";
import { eq } from "drizzle-orm";

import moment from "moment";
export default function TarefaScreen() {   
  const [title,       setTitle       ] = useState<string>('');
  const [description, setDescription ] = useState<string | any>('');
  const [hora,        setHora        ] = useState<string | any>(''); 
  const [data,        setData        ] = useState<string | any>(moment().format('YYYY-MM-DD'));
 
  const route = useRoute<RouteProp<DrawerProps, 'AdicionarTarefa'>>();
  const navigation = useNavigation(); 

  const usql = useSQLiteContext();
  const execute = drizzle(usql, { schema: tabelaScheme });
 
  async function onSave() {
    if(route.params.id) return onUpdate()
    if(!title ) {  return Alert.alert("Atenção!", "Nome é obrigatorio.")}  
    if(data < moment().format('YYYY-MM-DD')){
        return Alert.alert("Atenção!", "Não é possivel cadastrar tarefas no passado") 
    }     
    let uuid = Number(route.params?.uuid)
    try {             
      await execute.insert(tabelaScheme.tarefa).values({title, description, data, hora, uuid });  
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
          .where(eq(tabelaScheme.tarefa.id, Number(route.params.id)));                    
    } catch (error) {
        console.log(error);
    }
    tarefaClear();
  }

  async function findByID() {
    try {
        const result = await execute.query.tarefa.findFirst({
            where: ((id, { eq }) => eq(tabelaScheme.tarefa.id, Number(route.params?.id)))
        }); 
        if(result){          
          setTitle(result.title);
          setDescription(result.description);
          setHora(result.hora);
          setData(result.data);
        }
    } catch (error) {
        console.log(error)
    }
  }

  function tarefaClear(){
    setTitle('');
    setHora('');
    setDescription('');
    setData(moment().format('YYYY-MM-DD'));
    navigation.goBack();
  }
 
  useFocusEffect(useCallback(() => {
    if(route.params?.id){
      findByID();
    }
  },[route.params])); 

  const backAction = () => {
    tarefaClear();
    return true;
  };
  
  BackHandler.addEventListener(
    'hardwareBackPress', 
    backAction
  );


  return (
    <React.Fragment>
      <CardVertical style={{gap: 16}}>
        <InputCard placeholder={"Nome"} value={title} onChangeText={setTitle} />
        <InputCard placeholder={"Descrição"} value={description} onChangeText={setDescription} multiline/>      
        <ButtonSaveCard icon={'save'} title='Salvar' onPress={() => onSave()}/>          
      </CardVertical> 

      <BotonSheetCard  onChange={setData}/>
    </React.Fragment>
     
  )
}