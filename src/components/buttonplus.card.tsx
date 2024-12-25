import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { themeProps } from "@/utils/responsive";

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap,
}

const ButtonPlus = ({ icon, ...rest}: Props) => {
    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: '#F0F0F0'}]} {...rest}>
            <MaterialIcons name={icon} size={24} color={'#18181B'}/>
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