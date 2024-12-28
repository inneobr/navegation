import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";

import CronometroCard from "@/components/cronometro.card";
import * as tabelaScheme from "@/database/tabelaScheme";
import { DrawerProps } from "@/routes/drawerProps";

import { MaterialIcons } from "@expo/vector-icons";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { eq } from "drizzle-orm";

export default function CronometroScreen() {
    const [days,      setDays     ] = useState<number>(0);
    const [hours,     setHours    ] = useState<number>(0);
    const [minutes,   setMinutes  ] = useState<number>(0);
    const [seconds,   setSeconds  ] = useState<number>(0);
    const [tarefa_id, setTarefa_id] = useState<number>(0);

    const [id, setId ] = useState<number | undefined>(undefined);
    const [description, setDescription ] = useState<string | undefined>('');
    
    const [isRun,    setIsRun   ] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);    
    const route = useRoute<RouteProp<DrawerProps, 'CronometroScreen'>>();

    const navigation = useNavigation();
    const usql = useSQLiteContext();
    const execute = drizzle(usql, { schema: tabelaScheme });

    const handlerStart = () => {
        if (isRun) return;    
        setIsRun(true);
        intervalRef.current = setInterval(() => {
          setSeconds((prevSeconds) => {
            if (prevSeconds === 59) {
              setMinutes((prevMinutes) => {
                if (prevMinutes === 59) {
                  setHours((prevHours) => {
                    if (prevHours === 23) {
                      setDays((prevDays) => prevDays + 1);
                      return 0; 
                    }
                    return prevHours + 1;
                  });
                  return 0;
                }
                return prevMinutes + 1; 
              });
              return 0; 
            }
            return prevSeconds + 1;
          });
        }, 1000);            
    };

    const handlerPause = async () => {
      if (!isRun) return;      
      setIsRun(false);
      if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
      }  
      onSave()    
    };
    
    async function resetCronometro() {
        onDelete();
        resetParametros();
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRun(false);        
    };

    async function onDelete(){      
      try {
        if(id === undefined) return
        await execute.delete(tabelaScheme.cronometro)
          .where(eq(tabelaScheme.cronometro.id, id));
      } catch (error) {
          console.log(error);
      }
      resetCronometro();
  }

    useEffect(() => {      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, []);

    const resetParametros = () => {      
      setId(undefined)
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }

    async function findBy() {  
      try {
          const result = await execute.query.cronometro.findFirst({
              where: ((id, { eq }) => eq(tabelaScheme.cronometro.id,  route.params?.ID))
          });
          if(result !== undefined) {
            setId(Number(result.id))        
            setDays(Number(result.days));
            setHours(Number(result.hours));
            setMinutes(Number(result.minutes));
            setSeconds(Number(result.seconds));
            setTarefa_id(Number(result.tarefa_id));
          } else {
            resetParametros();
          }
      } catch (error) {
          console.log(error)
      }
    }

    async function onSave() {
      try { 
        if(id !== undefined) return onUpdate();
        await execute.insert(tabelaScheme.cronometro).values({ days, hours, minutes, seconds, tarefa_id }); 
      } catch (error) {
          console.log("Erro ao salvar cronômetro:", error);
          throw error;
      }
    }

    async function onUpdate() {      
      try {
        await execute.update(tabelaScheme.cronometro).set({ days, hours, minutes, seconds })
          .where(eq(tabelaScheme.cronometro.id, Number(id)));  
      } catch (error) {
        console.log("Erro ao atualizar cronômetro:", error);
        throw error;
      }
      resetParametros();
      navigation.goBack();
    }
    
    useFocusEffect(useCallback(() => {
      if(route.params?.ID === undefined) return;
          findBy();
    },[route.params?.ID]))

    return(
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <CronometroCard 
                days={days} 
                hours={hours} 
                minutes={minutes} 
                seconds={seconds} 
                running={isRun}
                onStart={()=> handlerStart()} 
                onPause={()=> handlerPause()} 
                onReset={()=> resetCronometro()}
            />
            <View style={css.container}>
              <TextInput value={description} onChangeText={setDescription} 
                placeholder="Anotações gerais" 
                placeholderTextColor={'#fff'}
                style={css.description} 
                multiline/>

              <TouchableOpacity onPress={()=>  onSave()}>
                  <MaterialIcons name="send" color={'#fff'} size={22} />
              </TouchableOpacity>
            </View>
            
        </View>
    )
}

const css = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    position: "absolute",
    flexDirection: "row",
    padding: 14,
    bottom: 0,
  },

  description:{
    color: '#fff',
    flex: 1
  }
})