import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";

import CronometroCard from "@/components/cronometro.card";
import * as tabelaScheme from "@/database/tabelaScheme";
import { DrawerProps } from "@/routes/drawerProps";

import { MaterialIcons } from "@expo/vector-icons";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { eq } from "drizzle-orm";
import { useTheme } from "@/customs";

export default function CronometroScreen() {
    const [days,      setDays     ] = useState<number>(0);
    const [hours,     setHours    ] = useState<number>(0);
    const [minutes,   setMinutes  ] = useState<number>(0);
    const [seconds,   setSeconds  ] = useState<number>(0);

    const [id,   setId   ] = useState<number>(0);
    const [description, setDescription ] = useState<string>('');
  
    const [isRun,    setIsRun   ] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);    
    const route = useRoute<RouteProp<DrawerProps, 'CronometroScreen'>>();

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
  }

    useEffect(() => {      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, []);

    const resetParametros = () => {      
      setId(0)
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }

    async function findByUuid() {  
      const tarefa_id = Number(route.params?.uuid)
      try {
          const result = await execute.query.cronometro.findFirst({
              where: ((uuid, { eq }) => eq(tabelaScheme.cronometro.uuid, tarefa_id))
          });

          if(result !== undefined) {
            setId(Number(result.id));        
            setDays(Number(result.days));
            setHours(Number(result.hours));
            setMinutes(Number(result.minutes));
            setSeconds(Number(result.seconds));
          } else {
            resetParametros();
          }
      } catch (error) {
          console.log(error)
      }
    }

    async function onSave() {
      try { 
        const tarefa_id = Number(route.params?.uuid)
        if(id !== 0) return onUpdate();
        await execute.insert(tabelaScheme.cronometro).values({ days, hours, minutes, seconds, uuid: tarefa_id }); 
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
    }
    
    useFocusEffect(useCallback(() => {
      if(route.params?.uuid === undefined) return;
          findByUuid();
    },[route.params?.uuid]))  
    
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
        </View>
    )
}