import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { CardHorizontal, CardVertical, Separator, Subtitle, Title } from "@/theme/component";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { DrawerNavigationProp } from "@react-navigation/drawer";
import * as tabelaScheme from "@/database/tabelaScheme";
import { DrawerProps } from "@/routes/drawerProps";

import { MaterialIcons } from "@expo/vector-icons";
import { drizzle } from "drizzle-orm/expo-sqlite";
import Externos from "@/components/externos.card";

import Carrocel from "@/components/carrocel.card";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";

import { useTheme } from "@/customs";
import { eq } from "drizzle-orm";
import moment from "moment";

type drawerProps =  DrawerNavigationProp<DrawerProps, 'CronometroScreen'>;
export default function TarefaViewScreen() {
    const [title,       setTitle       ] = useState<string | any>('');
    const [description, setDescription ] = useState<string | any>('');
    const [hora,        setHora        ] = useState<string | any>('');
    const [prioridade,  setPrioridade  ] = useState<string | any>('');  
    const [data,        setData        ] = useState<string | any>('');

    const route = useRoute<RouteProp<DrawerProps, 'TarefaViewScreen'>>();  
    const navigation = useNavigation<drawerProps>();
    const theme = useTheme()

    const handlerEditar = () => { 
        let terefa_id = Number(route.params?.ID)   
        navigation.navigate('AdicionarTarefa', {ID: terefa_id, CAT_ID: undefined});    
    }

    const handlerDelete = () => { 
        Alert.alert('', 'Deseja apagar?', [
            { text: "Cancelar" },
            { text: "Confirmar", onPress: () => onDelete() },
        ]);
    }
    const usql = useSQLiteContext();
    const execute = drizzle(usql, { schema: tabelaScheme });

    async function findBy() {
        try {
            const result = await execute.query.tarefa.findFirst({
                where: ((id, { eq }) => eq(tabelaScheme.tarefa.id, Number(route.params?.ID)))
            });  
            if(result !== undefined) {         
                setTitle(result?.title);
                setDescription(result?.description);
                setHora(result?.hora);
                setData(result?.data);
                setPrioridade(result?.prioridade);
            } else {
                setTitle('');
                setDescription('');
                setHora('');
                setData('');
                setPrioridade('');
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function onDelete(){    
        let terefa_id = Number(route.params?.ID)    
        try {
            await execute.delete(tabelaScheme.tarefa)
            .where(eq(tabelaScheme.tarefa.id, terefa_id));
        } catch (error) {
            console.log(error);
        }
        navigation.goBack();
    }

    useFocusEffect(useCallback(() => {
        if(route.params?.ID !== undefined) {            
            findBy();  
        } else {
            navigation.goBack();
        } 
    },[route.params.ID]))    
    
    
    return (        
            <View style={css.container}> 
                <CardVertical>
                    <CardHorizontal style={{justifyContent: "space-between", paddingHorizontal: 2, gap: 8}}>
                        <Title style={{flex: 1, fontSize: 22}}>{title}</Title> 
                        <TouchableOpacity onPress={()=> handlerDelete()}>
                            <MaterialIcons name="delete" color={theme.tint} size={22} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handlerEditar()}>
                            <MaterialIcons name="edit" color={theme.tint} size={22} />
                        </TouchableOpacity>
                    </CardHorizontal>
                    <Separator />

                    <ScrollView style={{maxHeight: 200}}>
                        { description && <Subtitle style={{color: theme.tint, textAlign: "justify", fontSize: 16}}>{description}</Subtitle> } 
                    </ScrollView>
                    <View style={{justifyContent: "flex-end", flexDirection: "row", paddingHorizontal: 2, marginTop: 10, gap: 8}}>
                        { hora && <Subtitle style={{color: theme.tint}}>Hora: {hora}</Subtitle> }
                        { data &&<Subtitle style={{color: theme.tint}}>Públicado: {moment(data).format('DD-MM-YYYY')}</Subtitle> }
                        { prioridade && <Subtitle style={{color: theme.tint}}>Prioridade: {prioridade}</Subtitle> }
                    </View> 
                </CardVertical>

                <Carrocel uuid={route.params?.ID}/>
                <Externos uuid={route.params?.ID}/>
            </View>
    )
}

const css = StyleSheet.create({
  container: {
    flex: 1
  },

  details: {
    textTransform: "capitalize",
  }
})