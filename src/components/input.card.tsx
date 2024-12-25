import { StyleSheet, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
}
export function InputCard({...rest}: Props ) {
    return (
        <TextInput style={[s.container, {backgroundColor: '#18181B', color: '#FFF', borderBottomColor: '#FFF'}]}           
            placeholderTextColor={'#FFF'}  
            autoCapitalize="none" autoCorrect={false}       
        {...rest} />
    )
}

const s = StyleSheet.create({
    container: {
        textAlignVertical: 'top',    
        borderBottomWidth: 1,
        paddingVertical: 10,
        maxHeight: 200,   
        minHeight: 40, 
        fontSize: 16,  
    }
})