import { themeProps } from "@/utils/responsive";
import { StyleSheet, Text, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
    title: string;
}

const TopTitleCard = ({ title, ...rest}: Props) => {
    return (
        <View style={[css.container, {backgroundColor: '#18181B'}]}>
          <Text style={[css.title, {color: '#FFF'}]}>{title}</Text>  
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