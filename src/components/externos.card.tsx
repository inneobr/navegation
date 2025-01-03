
import { CardHorizontal, CardVertical, Input, Separator, Subtitle } from "@/theme/component";
import { FlatList, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { externosProps } from "@/database/interfacesScheme";
import { useNavigation } from "@react-navigation/native";
import * as tabelaScheme from "@/database/tabelaScheme";

import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerProps } from "@/routes/drawerProps";

import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import { useTheme } from "@/customs";

import { eq } from "drizzle-orm";

type Props = { uuid: number | undefined }
const Externos = ({uuid}: Props) => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerProps, 'ExternosScreen'>>(); 
    const [database, setDatabase] = useState<externosProps[] | any>([])
    const [url, setUrl] = useState('');
    const theme = useTheme();
 
    const usql = useSQLiteContext();
    const execute = drizzle(usql, { schema: tabelaScheme });

    async function onSave() { 
        const [other, title] = url.split(".");
        let tafefa_id = Number(uuid);
        try {             
          await execute.insert(tabelaScheme.externos).values({ uuid: tafefa_id, title, url }); 
        } catch (error) {
          console.log(error);
        } 
        setUrl('')   
    }

    async function findByUuid() { 
        let tafefa_id = Number(uuid);
        try {
            const result = await execute.query.externos.findMany({
                where: ((uuid, { eq }) => eq(tabelaScheme.image.uuid, tafefa_id))
            });               
            setDatabase(result);
        } catch (error) {
            console.log(error)
        }
    }

    async function onDelete(event: number){        
        try {
            await execute.delete(tabelaScheme.externos)
            .where(eq(tabelaScheme.externos.id, event));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {    
        uuid !== undefined ? findByUuid() : navigation.goBack();
      },[database]
    );
   
    return (
        <CardVertical style={{height: "20%", maxHeight: "20%"}}>
            <CardHorizontal style={{marginBottom: 8}}>
                <Input placeholder="Lista de links" value={url} onChangeText={setUrl} numberOfLines={1}/>
                <TouchableOpacity onPress={()=> onSave()}>
                    <MaterialIcons name={'add'} size={18} color={theme.font} style={[css.button, {backgroundColor: theme.shap}]} />
                </TouchableOpacity>               
            </CardHorizontal> 

            <FlatList
                data={database}  
                horizontal = {false}           
                showsVerticalScrollIndicator={false}                  
                keyExtractor={(item) => String(item.id)}                 
                renderItem={({item}) => (    
                    <View style={{marginVertical: 8}}>                    
                        <View style={{justifyContent: "space-between", flexDirection: "row", gap: 16}}>
                            <Subtitle style={{flex: 1, fontSize: 15, color: theme.font}}>{item.title}</Subtitle>

                            <TouchableOpacity onPress={()=> onDelete(item.id)}>
                                <MaterialIcons name='delete' size={15} color={theme.font}/>                                
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> Linking.openURL(item.url)}>
                                <MaterialIcons name='language' size={15} color={theme.font}/>
                            </TouchableOpacity>
                        </View>
                        <Separator />
                    </View>
            )}/> 
        </CardVertical>
    )
}
export default Externos

const css = StyleSheet.create({
    button: {       
        borderRadius: 8,
        padding: 8,
    }
})