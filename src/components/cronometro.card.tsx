import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { cronometroProps } from "@/database/interfacesScheme";
import * as tabelaScheme from "@/database/tabelaScheme";

import { useEffect, useRef, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

import { useTheme } from "@/utils/responsive";
import { eq } from "drizzle-orm";

type Props = {
    evento: number;
}

const CronometroCard = ({evento}: Props) => {   
    const theme = useTheme();
    const [id, setId] = useState<number | any>();
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [isRunning, setIsRunning] = useState(false);
    const [cronometro,  setCronometro] = useState<cronometroProps | any>();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const formatTime = (time: number) => String(time).padStart(2, '0');

    const startTimer = () => {
        if (isRunning) return;    
        setIsRunning(true);
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

    const stopTimer = () => {
        if (!isRunning) return;
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        handlerSave();
    };

    const handlerClear = () =>{        
        Alert.alert("Atenção!", "Ao zerar o cronometro todos os dados serão perdido, deseja continuar?", [
            { text: "Cancelar"},
            { text: "Apagar", onPress: () => clearTimer() },
        ]);
    };

    const handlerSave = () =>{
        if(id) onUpdate();
        else onSave()
    }

    const clearTimer = () => {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);

        if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        }
        setIsRunning(false);
        onDelete()
    };

    const usql = useSQLiteContext();
    const execute = drizzle(usql, { schema: tabelaScheme });

    async function onSave() {       
        try {
            const lastInsertRowId = await execute.insert(tabelaScheme.cronometro).values({days, hours, minutes, seconds, tarefa: evento});      
            setId(lastInsertRowId)      
        } catch (error) {
            console.log(error);
        }
    }

    async function onUpdate() {
        try {  
            await execute.update(tabelaScheme.cronometro).set({ days, hours, minutes, seconds})
            .where(eq(tabelaScheme.cronometro.id, Number(id)));                
        } catch (error) {
            console.log(error);
        }
    }

    async function findByEvento() {
        try {
            const response = await execute.query.cronometro.findFirst({
                where: ((tarefa, { eq }) => eq(tabelaScheme.cronometro.tarefa, evento))
            });             
            setCronometro(response);
            handlerRecovery()
        } catch (error) {
            console.log(error)
        }
    }

    async function onDelete(){
        try {
            await execute.delete(tabelaScheme.cronometro)
            .where(eq(tabelaScheme.cronometro.id, id));
        } catch (error) {
            console.log(error);
        }
    }

    async function handlerRecovery(){ 
        if(!cronometro) return;
        setId(cronometro?.id)        
        setDays(cronometro?.days);
        setHours(cronometro?.hours);
        setMinutes(cronometro?.minutes);
        setSeconds(cronometro?.seconds); 
    }; 

    useEffect(() => { 
        findByEvento();       
        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
    }, [evento]);

    return (        
        <View style={[css.container, {backgroundColor: theme.colors.base}]}>
            <View style={[css.sectionDays, {backgroundColor: theme.font.color}]}>
                <Text style={[css.textDays,{color: theme.colors.card}]}>{formatTime(days)}</Text>
                <Text style={{fontSize: 18, color: theme.colors.card}}>DIAS</Text>
            </View>
            <View style={css.sectionRelogio}>
                <Text style={[css.textRelogio,{color: theme.font.color}]}>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</Text>
                <View style={css.sectionOptions}>
                    {!isRunning && <Button title="Start" color={theme.colors.shap} onPress={startTimer}/>}
                    {isRunning  && <Button title="Stop"  color={theme.colors.shap} onPress={stopTimer}/> }
                    <Button title="Clear"  color={theme.colors.shap}  onPress={handlerClear}/>
                </View>
            </View>
        </View>
    )
}
export default CronometroCard

const css = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 8,
        padding: 8,
        gap: 8
    },    

    sectionDays: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 8,
        padding: 4,
        width:  100,
        height: 80
    },

    textDays: {
        fontSize: 46
    },
        
    sectionRelogio: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: 80,
        flex: 1
    },

    textRelogio: {
        textAlign: "center",
        fontWeight: 600,
        width: "100%",
        color: "#FFF",
        fontSize: 40,
    },

    sectionOptions: {        
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 16
    },

})