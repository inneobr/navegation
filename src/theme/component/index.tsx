import { useTheme } from '@/customs';
import { MaterialIcons } from '@expo/vector-icons';
import { Text as DefaultText, 
    View as DefaultView, 
    StyleSheet, 
    TextInput, 
    TextInputProps, 
    useWindowDimensions
} from 'react-native';

export type TextProps =  DefaultText['props'];
export type ViewProps =  DefaultView['props'];
const space = 28;

export function CardVertical(props: ViewProps) {
    const theme = useTheme();
    const { width } = useWindowDimensions();
    const { style, ...otherProps }  = props;  
    return <DefaultView style={[css.cardVertical, {backgroundColor: theme.card, width: width - space}, style]} {...otherProps} />;
}

export function CardHorizontal(props: ViewProps) {
    const theme = useTheme();
    const { style, ...otherProps }  = props;  
    return <DefaultView style={[css.cardHorizontal, {backgroundColor: theme.card}, style]} {...otherProps} />;
}

export function Title(props: TextProps) { 
    const theme = useTheme();
    const { style, ...otherProps } = props;
    return <DefaultText style={[{color: theme.font}, css.title, style]} {...otherProps} />;
}

export function Subtitle(props: TextProps) { 
    const theme = useTheme();
    const { style, ...otherProps } = props;
    return <DefaultText style={[{color: theme.tint}, css.subtitle, style]} {...otherProps} />;
}

export function Text(props: TextProps) { 
    const theme = useTheme();
    const { style, ...otherProps } = props;
    return <DefaultText style={[{color: theme.font}, style]} {...otherProps} />;
}


export function Input(props: TextInputProps ) {
    const theme = useTheme();  
    const { style, ...otherProps } = props;   
    return <TextInput placeholderTextColor={theme.font} style={[{color: theme.tint, backgroundColor: theme.shap}, css.input, style]} {...otherProps} />
}

export function Separator(props: ViewProps) {
    const theme = useTheme(); 
    const { style, ...otherProps } = props;
    const backgroundColor = theme.body;  
    return <DefaultView style={[{backgroundColor}, css.line, style]} {...otherProps} />;
}

const css = StyleSheet.create({
    cardVertical: {
        flexDirection: "column",
        paddingHorizontal: 14, 
        paddingVertical: 14,
        borderRadius: 8,
        width: "100%",
        margin: 14,
        gap: 4
    },

    cardHorizontal: {
        flexDirection: "row",
        gap: 4
    },

    title: {        
        textTransform: "capitalize",
        fontWeight: "600",
        fontSize: 18,
    },

    subtitle: {
        textTransform: "capitalize",
        fontSize: 14,
    },

    input: {
        paddingHorizontal: 10,
        borderRadius: 8,
        flex: 1
    },

    line: {
        marginVertical: 8,
        borderRadius: 8,
        height: 1,
    },
})