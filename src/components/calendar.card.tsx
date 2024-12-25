import { StyleSheet, useWindowDimensions, View } from "react-native";
import { eventosProps } from '@/database/interfacesScheme';
import { Calendar } from 'react-native-calendars';

import React, { useState } from "react";
import moment from 'moment';

type Props = {
    tarefas:  eventosProps[];
    onChange: (date: string ) => void
}

const CalendarCard = ({tarefas, onChange}: Props) => { 
    const [ selected, setSelected] = useState<string>('');
    const { width } = useWindowDimensions();

    const markedDates = tarefas.reduce((acc, item) => {
        acc[item.data] = { selected: false, marked: true,  selectedColor: "#F06543" };
        acc[selected] = { selected: true,  marked: false, selectedColor:  '#434d53'};
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
            <View style={[css.container, {width: width - 28, backgroundColor: '#18181B'}]}> 
                <View style={[css.line, {backgroundColor: '#F0F0F0'}]} />
                <Calendar
                    markedDates={markedDates}
                    onDayPress={(day : any) => selectData(day.dateString)}
                    theme={{
                        selectedDayBackgroundColor: '#434d53',
                        textDayStyle: { color: '#F0F0F0' },
                        selectedDayTextColor: '#F0F0F0',
                        textDisabledColor:  '#F0F0F0',
                        calendarBackground: '#18181B', 
                        monthTextColor: '#FFF',
                        arrowColor: '#F0F0F0',               
                        todayTextColor: "#F06543",
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