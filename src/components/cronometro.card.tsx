import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { CardVertical, Subtitle, Title } from "@/theme/component";

import ButtonIconCard from "./buttonIcon.card";
import { useTheme } from "@/customs";
import { useFonts } from 'expo-font';
import {  useEffect } from "react";

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
        <CardVertical style={[css.container, {flex: 1}]}>
            {days > 0 && <Title style={[css.header, {marginVertical: 12}]}>{days} <Subtitle>Dias</Subtitle></Title>}

            <CircularProgressBase 
                radius={100}
                maxValue={59}
                value={seconds}
                activeStrokeWidth={12}
                inActiveStrokeWidth={6}
                activeStrokeColor={theme.open}
                inActiveStrokeColor={theme.font}> 
                <View style={css.section}>
                    <Text style={[css.clock, {color: theme.open}]}>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</Text>                    
                </View>                   
                    
            </CircularProgressBase>

            <View style={css.footer}>
                {!running && <ButtonIconCard icon={'play'}  title="start" onPress={onStart} />}
                { running && <ButtonIconCard icon={'pause'} title="pause" onPress={onPause} />}
                <ButtonIconCard icon={'stop'}  title="reset" onPress={onReset} />
            </View>
        </CardVertical>
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
        fontSize: 30,
        gap: 4
    },

    section: {
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",       
    },

    header: {
        fontFamily: 'DigitalFont',
        letterSpacing: 6,
        fontSize: 40,
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