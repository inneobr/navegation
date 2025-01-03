
import { CardHorizontal, CardVertical, Input, Separator } from "@/theme/component";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {todolistProps } from "@/database/interfacesScheme";
import * as tabelaScheme from "@/database/tabelaScheme";
import React, { useEffect, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';

import { useTheme } from "@/customs";
import { eq } from "drizzle-orm";

type Props = { uuid: number | undefined }
const TodoList = ({uuid}: Props) => {  
    const [description, setDescription] = useState<string | any>('');  
    const [database,    setDatabase   ] = useState<todolistProps[] | any>([])

    const theme = useTheme();
    const usql = useSQLiteContext();
    const execute = drizzle(usql, { schema: tabelaScheme });

    async function onSave() {
        try { 
            let tafefa_id = Number(uuid);          
            await execute.insert(tabelaScheme.todolist).values({ uuid: tafefa_id, active: null, description }); 
        } catch (error) {
          console.log(error);
        } 
        setDescription('')
    }

    async function onDelete(event: number){        
        try {
            await execute.delete(tabelaScheme.todolist)
            .where(eq(tabelaScheme.todolist.id, event));
        } catch (error) {
            console.log(error);
        }
    }

    async function findByUuid() { 
        let tafefa_id = Number(uuid);
        try {
            const result = await execute.query.todolist.findMany({
                where: ((uuid, { eq }) => eq(tabelaScheme.todolist.uuid, tafefa_id))
            });               
            setDatabase(result);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {    
        findByUuid();
      },[database]
    );  

    return (
        <CardVertical style={{height: "50%", maxHeight: "50%"}}>
            <CardHorizontal style={{marginBottom: 8}}>
                <Input style={{color: theme.font}} placeholder="Item da lista" value={description} onChangeText={setDescription} numberOfLines={1} />

                <TouchableOpacity onPress={()=> onSave()}>
                    <MaterialIcons name={'add'} size={18} color={theme.font} style={[css.button, {backgroundColor: theme.shap}]} />
                </TouchableOpacity>               
            </CardHorizontal> 

            <FlatList
                data={database}  
                horizontal = {false}           
                showsVerticalScrollIndicator={false}                  
                keyExtractor={(item) => String(item.id)}                 
                renderItem={({item, index}) => (    
                    <View style={{marginVertical: 8}}>                    
                        <View style={{justifyContent: "space-between", flexDirection: "row", gap: 16}}> 
                            <Text style={[{flex: 1, fontSize: 16, color: theme.font}]}>🚀 {item.description}</Text>

                            <TouchableOpacity onPress={()=> onDelete(item.id)}>
                                <MaterialIcons name='delete' size={20} color={theme.font}/>                                
                            </TouchableOpacity>
                        </View>
                        <Separator />
                    </View>
            )}/> 
        </CardVertical>
    )
}
export default TodoList

const css = StyleSheet.create({
    button: {       
        borderRadius: 8,
        padding: 8,
    }
})