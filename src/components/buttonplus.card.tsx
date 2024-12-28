import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/customs";

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap,
}

const ButtonPlus = ({ icon, ...rest}: Props) => {
    const theme = useTheme();
    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: theme.card}]} {...rest}>
            <MaterialIcons name={icon} size={24} color={theme.font}/>
        </TouchableOpacity>
    )
}
export default ButtonPlus

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        position: "absolute",
        alignItems: "center",
        borderRadius: 100,
        elevation: 8,
        padding:  4,
        height:  52,
        width:  52,
        bottom: 14,
        right: 14,
    },
})