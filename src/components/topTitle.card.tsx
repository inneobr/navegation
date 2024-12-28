import { useTheme } from "@/customs";
import { StyleSheet, Text, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
    title: string;
}

const TopTitleCard = ({ title, ...rest}: Props) => {
    const theme = useTheme()
    return (
        <View style={[css.container, {backgroundColor: theme.card}]}>
          <Text style={[css.title, {color: theme.font}]}>{title}</Text>  
        </View> 
    )
}
export default TopTitleCard

const css = StyleSheet.create({
    container: {
        justifyContent: "space-between", 
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        borderRadius: 8,
        padding: 12,
        gap: 8
    },

    title: {
        textTransform: "uppercase",
        fontWeight: '500',
        fontSize: 16,    
    },
})