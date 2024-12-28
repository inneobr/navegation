import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ButtonIconCard from "./buttonIcon.card";
import { useFonts } from 'expo-font';
import {  useEffect } from "react";
import { useTheme } from "@/customs";

type circularProps = {
    days:     number;
    hours:    number;
    minutes:  number;
    seconds:  number;
    running:  boolean;
    onStart: ()=> void;
    onPause: ()=> void;
    onReset: ()=> void;
}


const CronometroCard = ({days, hours, minutes, seconds, running, onStart, onPause, onReset}: circularProps) => {
    const formatTime = (time: number) => String(time).padStart(2, '0');

    const [loading] = useFonts({
        DigitalFont: require('@/constants/Digital-font.ttf'),
    });

    useEffect(() => {
        if (loading) { <ActivityIndicator/> }
    }, [loading]);
     
    const theme = useTheme();
    return (
        <View style={css.container}>            
            <CircularProgressBase 
                radius={100}
                maxValue={59}
                value={seconds}
                activeStrokeWidth={8}
                inActiveStrokeWidth={10}
                activeStrokeColor={theme.open}
                inActiveStrokeColor={theme.shap}> 
                <View style={css.section}>
                    <Text style={[css.clock, {color: theme.open}]}>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</Text>
                    <Text style={[css.clock, {fontSize: 25, marginTop: 15, color: theme.font}, days > 0 ? {display: 'flex'}: {display: 'none'}]}>{formatTime(days)} dias</Text>
                </View>                   
                    
            </CircularProgressBase>

            <View style={css.footer}>
                {!running && <ButtonIconCard icon={'play'}  title="start" onPress={onStart} />}
                { running && <ButtonIconCard icon={'pause'} title="pause" onPress={onPause} />}
                <ButtonIconCard icon={'stop'}  title="reset" onPress={onReset} />
            </View>
        </View>
    )

}
export default CronometroCard

const css = StyleSheet.create({
    container: {   
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },

    clock: {
        flexDirection: "column",
        fontFamily: 'DigitalFont',
        letterSpacing: 6,
        fontSize: 40,
        gap: 4
    },

    section: {
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",       
    },

    footer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center", 
        marginTop: 20,
        width: 180,
        gap: 8
    }
})