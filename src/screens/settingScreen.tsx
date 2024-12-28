import {  View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as tabelaScheme from "@/database/tabelaScheme";
import PickColorCard from '@/components/pickColor.card';
import { InputCard } from '@/components/input.card';

import { MaterialIcons } from '@expo/vector-icons';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';

import { useCallback, useState } from 'react';
import { eq } from 'drizzle-orm';
import { useTheme } from '@/customs';

export default function SettingsScreen () {
  const [id,    setId    ] = useState<number | any>(null);
  const [title, setTitle ] = useState<string | any>('Planner');
  const [color, setColor ] = useState<string | any>('#1C1C1C');
  const [checked, setChecked ] = useState<boolean | any>(true);

  const navigation = useNavigation();

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const usql = useSQLiteContext();
  const execute = drizzle(usql, { schema: tabelaScheme }); 
  
  async function onSave() {
    if(id) return onUpdate()
    try {             
      await execute.insert(tabelaScheme.setting).values({title, color, checked});      
    } catch (error) {        
      Alert.alert("Atenção", `Tivemos um problema: ${error}`);
      console.log(error);     
    }
    handlerClear()
  }
  
  async function onUpdate() {
    try {  
        await execute.update(tabelaScheme.setting).set({title, color, checked})
          .where(eq(tabelaScheme.setting.id, Number(id)));                    
    } catch (error) {
        console.log(error);
    }
    handlerClear()
  }

   async function findById() { 
      try {
          const response = await execute.query.setting.findFirst({
              where: ((id, { eq }) => eq(tabelaScheme.setting.id, 1))
          });      
          setId(response?.id)      
          setTitle(response?.title);
          setColor(response?.color);
          setChecked(response?.checked);

          console.log(response)
      } catch (error) {
          console.log(error)
      }
  }

  const handlerClear = () => {
    setId(null)      
    setTitle('Planner');
    setColor('#1C1C1C');
    setChecked(true);
    navigation.goBack();
  }

  useFocusEffect(useCallback(() => {
    findById()
  },[]));  

  const theme = useTheme()
  return (
    <SafeAreaProvider style={css.container}>
        <View style={{flexDirection: "row", backgroundColor: theme.base, alignItems: "center", paddingHorizontal: 14}}>
          <View style={css.header}>
            <Text style={[css.title, {color: theme.font}]}>Configurações </Text>  
            <Text style={[css.subtitle, {color: theme.tint}]}>Personalize seu planner</Text>
          </View>
          <TouchableOpacity onPress={()=> onSave()}>
              <MaterialIcons name='save' color={theme.font} size={40}/>
          </TouchableOpacity> 
      </View>
      
      <View style={[css.section, {backgroundColor: theme.base}]}>
        <View style={css.row}>
          <Text style={[css.item, {color: theme.font}]}>App name:</Text>
          <InputCard placeholder={"Planner"} value={title} onChangeText={setTitle} style={{flex: 1, color: theme.font,  textAlign: "right"}} maxLength={12}/>
        </View>

        <View style={css.row}>
          <Text style={[css.item, {color: theme.font}]}>Mostrar descrição tarefas:</Text>
          <Switch value={checked} onValueChange={toggleSwitch}  thumbColor={theme.font} trackColor={{true: theme.tint, false: theme.tint}}/>
        </View>

        <View style={css.column}>
          <Text style={{color: theme.font, textTransform: "uppercase", padding: 10}}>cor principal:</Text>
          <PickColorCard filter={color} onChange={setColor}/>
        </View>
      </View>      
    </SafeAreaProvider>
  );
}


const css = StyleSheet.create({
    container: {
      flexDirection: "column",
      borderRadius: 8,
      flex: 1,
      gap: 16
    },

    header: {
      flexDirection: "column",
      borderRadius: 8,
      padding: 14,
      flex: 1,
      gap: 4
    },

    title: {      
      textTransform: "uppercase",
      fontWeight: '500',
      fontSize: 16,
    },

    subtitle: {
      fontSize: 14,
    },

    section: {          
      flexDirection: "column",
      borderRadius: 8,
      padding: 14,
      gap: 8
    },

    column: {
      justifyContent: "space-between",  
      flexDirection: "column", 
      gap: 16
    },

    row: {
      justifyContent: "space-between",       
      borderBottomColor: "#c0c0c0", 
      borderBottomWidth: 1,
      alignItems: "center",
      flexDirection: "row",      
      borderRadius: 8,
      paddingHorizontal: 8,
      gap: 4
    },

    item: {
      textTransform: "uppercase",      
      color: "#fff",
      width: "50%",
    },
});