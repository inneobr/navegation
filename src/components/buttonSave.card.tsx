import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/customs";

type Props = TouchableOpacityProps & {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
};

const ButtonSaveCard = ({icon, title, ...rest}: Props) => {
    const theme = useTheme();
    return (
        <TouchableOpacity {...rest}>
            <View style={[styles.container, {backgroundColor: theme.card}]}>  
                <Ionicons name={icon} color={theme.font}  size={16} />            
                <Text style={[styles.text, {color: theme.font}]}>{title}</Text>
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