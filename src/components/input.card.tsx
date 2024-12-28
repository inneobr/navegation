import { useTheme } from "@/customs";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
}

export function InputCard({...rest}: Props ) {
    const theme = useTheme();     
    return (
        <TextInput style={[s.container, {backgroundColor: theme.shap, color: theme.font}]}           
            placeholderTextColor={theme.font}  
            autoCapitalize="none" autoCorrect={false}       
        {...rest} />
    )
}

const s = StyleSheet.create({
    container: {
        textAlignVertical: 'top',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 8,
        maxHeight: 200,   
        minHeight: 40, 
        fontSize: 16,  
    }
})