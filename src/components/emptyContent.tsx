import { useTheme } from "@/customs";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
    title:   string
    message: string,
}

export function EmptyContent({ title, message}: Props) { 
    const imageProps = require('@/assets/img/ferias.png');
    const theme = useTheme();
    return (
        <View style={css.container}>
            <Image source={imageProps} style={css.imageProps}/>
            <Text style={[css.title, {color: theme.font}]}>{title}</Text>
            <Text style={[css.description, {color: theme.tint}]}>{message}</Text>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    },

    title: {
        fontSize: 22,
        fontWeight: "500"
    },

    description: {
        fontSize: 14,
    }, 
    imageProps: {
        height: 100,
        width:  100
    }

})