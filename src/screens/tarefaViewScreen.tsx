import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import * as tabelaScheme from "@/database/tabelaScheme";

import { DrawerProps } from "@/routes/drawerProps";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

import { useCallback, useState } from "react";
import { useTheme } from "@/customs";
import { MaterialIcons } from "@expo/vector-icons";

type drawerProps =  DrawerNavigationProp<DrawerProps, 'CronometroScreen'>;
export default function TarefaViewScreen() {
    const [title,       setTitle       ] = useState<string | any>('');
    const [description, setDescription ] = useState<string | any>('');
    const [hora,        setHora        ] = useState<string | any>('');
    const [prioridade,  setPrioridade  ] = useState<string | any>('');  
    const [data,        setData        ] = useState<string | any>('');

    const route = useRoute<RouteProp<DrawerProps, 'TarefaViewScreen'>>();
    const { width } = useWindowDimensions();
    const navigation = useNavigation<drawerProps>();
    if(route.params.ID === undefined) navigation.goBack();

    const pressGesture = (item: number) => Gesture
        .LongPress()
        .onTouchesDown(() => {
            onPress(item)   
        })
        .onEnd((e, success) => {
        if (success) {   
           
        }
    })
    .runOnJS(true);  

    function onPress(item: number){
        navigation.navigate('AdicionarTarefa', {ID: item, CAT_ID: undefined});    
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

    useFocusEffect(useCallback(() => {
        findBy();    
    },[route.params.ID]))    
    
    const theme = useTheme()
    return (        
            <SafeAreaProvider style={{width: (width) + 5}}>
                <GestureDetector gesture={pressGesture(route.params.ID)} key={route.params.ID}> 
                    <View style={[css.container, {backgroundColor: theme.base}]}>
                        <Text style={[css.title, {color: theme.font}]}>{title}</Text> 
                        { description && <Text style={{color: theme.tint}}>{description}</Text> }
                        { prioridade && <Text style={[css.details, {color: theme.font}]}>{prioridade}</Text> }    
                        { hora && <Text style={[css.details, {color: theme.font}]}>{hora}</Text> }  
                        { data && <Text style={[css.details, {color: theme.font}]}>{data}</Text> }               
                    </View>                
                </GestureDetector>

                <View style={{width: width, flexDirection: "row", margin: 14, gap: 8}}>
                    <TouchableOpacity style={{padding: 12, backgroundColor: theme.card, borderRadius: 8}} onPress={()=> navigation.navigate("GalleryScreen", { uuid: route.params.ID})}>
                        <MaterialIcons name="camera" size={24} color={theme.font} />
                    </TouchableOpacity>
            
                    <TouchableOpacity style={{padding: 12, backgroundColor: theme.card, borderRadius: 8}}>
                        <MaterialIcons name="link" size={24} color={theme.font} />
                    </TouchableOpacity>
            
                    <TouchableOpacity style={{padding: 12, backgroundColor: theme.card, borderRadius: 8}}>
                        <MaterialIcons name="comment" size={24} color={theme.font} />
                    </TouchableOpacity>
                </View>
            </SafeAreaProvider>
    )
}

const css = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 8,
    padding: 14,
    margin: 14,
    gap: 30
  },

  title: {
    borderBottomColor: "#f0f0f0",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    paddingVertical: 14,
    fontSize: 18,
  },

  details: {
    textTransform: "capitalize",
  }
})