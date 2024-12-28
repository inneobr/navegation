import { StyleSheet, useWindowDimensions, View } from "react-native";
import { eventosProps } from '@/database/interfacesScheme';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import React, { useState } from "react";
import moment from 'moment';
import { useTheme } from "@/customs";
import { ptBR } from "@/utils/data/locale";

type Props = {
    tarefas:  eventosProps[];
    onChange: (date: string ) => void
}

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

const CalendarCard = ({tarefas, onChange}: Props) => { 
    const [ selected, setSelected] = useState<string>('');
    const { width } = useWindowDimensions();
    const theme = useTheme()

    const markedDates = tarefas.reduce((acc, item) => {
        acc[item.data] = { selected: false, marked: true,  selectedColor: theme.open };
        acc[selected] = { selected: true,  marked: false,  selectedColor: theme.open};
        return acc;
    }, {} as Record<string, { selected: boolean; marked: boolean; selectedColor: string }>); 
    
    const selectData = (event: string) => {
        if(selected === event){
            onChange(moment().format('YYYY-MM-DD'));
            setSelected(moment().format('YYYY-MM-DD'));
        }else {
            onChange(event);
            setSelected(event);
        }        
    }

    
    return (             
            <View style={[css.container, {width: width - 28, backgroundColor: theme.card}]}> 
                <View style={[css.line, {backgroundColor: theme.font}]} />
                <Calendar
                    markedDates={markedDates}
                    onDayPress={(day : any) => selectData(day.dateString)}
                    theme={{
                        selectedDayBackgroundColor: theme.open,
                        textDayStyle: { color: theme.font },
                        selectedDayTextColor: theme.font,
                        textDisabledColor:  theme.tint,
                        calendarBackground: theme.card, 
                        monthTextColor: theme.font,
                        arrowColor: theme.font,               
                        todayTextColor: theme.open,
                        textMonthFontSize: 18,
                        arrowStyle: {
                        margin: 0,
                        padding: 0,
                        },
                    }}
                />
            </View>         
    )
};
export default CalendarCard

const css = StyleSheet.create({
    container: {
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 8,
        marginTop: 14
    },

    line: {
        position: "absolute",
        borderRadius: 12,
        width: 40,
        height: 4,
        top: 8,
    },
});