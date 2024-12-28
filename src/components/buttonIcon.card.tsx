import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/customs";

type Props = TouchableOpacityProps & {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress: () => void
};

const ButtonIconCard = ({icon, title, ...rest}: Props) => {
    const theme = useTheme()
    return (
        <TouchableOpacity {...rest}>
            <View style={styles.container}>  
                <Ionicons name={icon} color={theme.font}  size={16} />            
                <Text style={[styles.text, {color: theme.font}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default ButtonIconCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8
    },

    text: {
        fontWeight: '500',
        fontSize: 16,
    }
});