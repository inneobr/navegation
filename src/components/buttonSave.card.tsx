import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themeProps } from "@/utils/responsive";

type Props = TouchableOpacityProps & {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
};

const ButtonSaveCard = ({icon, title, ...rest}: Props) => {
    return (
        <TouchableOpacity {...rest}>
            <View style={[styles.container, {backgroundColor: '#27272A'}]}>  
                <Ionicons name={icon} color={'#FFF'}  size={16} />            
                <Text style={[styles.text, {color: '#FFF'}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default ButtonSaveCard

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        padding: 12,
        gap: 8
    },

    text: {
        fontWeight: '500',
        fontSize: 20,
    }
});