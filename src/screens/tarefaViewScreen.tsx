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
import TodoList from "@/components/todolist.card";

type drawerProps =  DrawerNavigationProp<DrawerProps>;
export default function TarefaViewScreen() {
    const [title,       setTitle       ] = useState<string | any>('');
    const [description, setDescription ] = useState<string | any>('');
    const [hora,        setHora        ] = useState<string | any>(''); 
    const [data,        setData        ] = useState<string | any>('');

    const [lista,    setLista   ] = useState(false);
    const [galery,   setGalery  ] = useState(false);
    const [externos, setExternos] = useState(false);

    const route = useRoute<RouteProp<DrawerProps, 'TarefaViewScreen'>>();  
    const navigation = useNavigation<drawerProps>();
    const theme = useTheme()

    const handlerEditar = () => { 
        let terefa_id = Number(route.params.id)   
        navigation.navigate('AdicionarTarefa', {id: terefa_id, uuid: undefined});    
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
                where: ((id, { eq }) => eq(tabelaScheme.tarefa.id, Number(route.params?.id)))
            });  
            if(result !== undefined) {         
                setTitle(result?.title);
                setDescription(result?.description);
                setHora(result?.hora);
                setData(result?.data);
            } else {
                setTitle('');
                setDescription('');
                setHora('');
                setData('');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlerCronometro = () => {
        let terefa_id = Number(route.params?.id)
        navigation.navigate("CronometroScreen", {uuid: terefa_id})
    }  

    async function onDelete(){    
        let terefa_id = Number(route.params?.id)
        try {
            await execute.delete(tabelaScheme.image).where(eq(tabelaScheme.image.uuid, terefa_id));            
            await execute.delete(tabelaScheme.todolist).where(eq(tabelaScheme.todolist.uuid, terefa_id));
            await execute.delete(tabelaScheme.externos).where(eq(tabelaScheme.externos.uuid, terefa_id));
            await execute.delete(tabelaScheme.cronometro).where(eq(tabelaScheme.cronometro.uuid, terefa_id));
            await execute.delete(tabelaScheme.tarefa).where(eq(tabelaScheme.tarefa.id, terefa_id));
        } catch (error) {
            console.log(error);
        }
        navigation.goBack();
    }

    useFocusEffect(useCallback(() => {
        if(route.params?.id !== undefined) {            
            findBy();  
        } else {
            navigation.goBack();
        } 
    },[route.params.id]))    
    
    const onGalery = () => {
        setGalery((galery) => !galery);
        setExternos(false);
        setLista(false);
    }

    const onList = () => {
        setLista((lista) => !lista);
        setExternos(false);
        setGalery(false);
    }

    const onExterno = () => {
        setExternos((externos) => !externos);
        setGalery(false);
        setLista(false);
    }
    
    return (        
        <View style={css.container}> 
            <CardVertical style={{flex: 1}}>
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

                <ScrollView style={{flex: 1, marginBottom: 20}}>
                    { description && <Subtitle style={{color: theme.tint, textAlign: "justify", fontSize: 16}}>{description}</Subtitle> } 
                </ScrollView>
                <View style={css.information}>                      
                    <TouchableOpacity onPress={()=>   onGalery()}>
                        <MaterialIcons name="image" size={20} color={theme.tint}/>
                    </TouchableOpacity> 

                    <TouchableOpacity onPress={()=>  handlerCronometro()}>
                        <MaterialIcons name="timer" size={20} color={theme.tint}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>    onList()}>
                        <MaterialIcons name="list"  size={20} color={theme.tint} />
                    </TouchableOpacity>      

                    <TouchableOpacity onPress={()=> onExterno()}>
                        <MaterialIcons name="link"  size={20} color={theme.tint} />
                    </TouchableOpacity>
                    
                    { hora && <Subtitle style={{color: theme.tint}}>Hora: {hora}</Subtitle> }
                    { data &&<Subtitle style={{color: theme.tint}}>Públicado: {moment(data).format('DD-MM-YYYY')}</Subtitle> }
                </View> 
            </CardVertical>
            
            { galery && 
            <Carrocel uuid={route.params?.id}/>}

            { lista &&
            <TodoList uuid={route.params?.id}/>}

            { externos &&
            <Externos uuid={route.params?.id}/>}
        </View>
    )
}

const css = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1
  },

  details: {
    textTransform: "capitalize",
  },

  information: {
    justifyContent: "space-between", 
    paddingHorizontal: 2,
    flexDirection: "row", 
    marginTop: 10, 
  }
})