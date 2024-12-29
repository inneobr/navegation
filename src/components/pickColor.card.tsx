import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "@/utils/data/colors";
import { useTheme } from "@/customs";

type Props = {
    filter: string;
    onChange: (color: string ) => void;
}

const PickColorCard = ({filter, onChange, ...rest}: Props) => { 
    const theme = useTheme();  
    return (
        <View style={[css.container, {borderColor: theme.shap}]}>
            {
                colors && colors.map((item, index) => {
                    let isActive = filter === item;
                    let  borderWidth = isActive? 2 : 0
                    return (
                        <Pressable onPress={() => onChange(item)} key={item}>
                            <View style={[css.section, {borderWidth, borderColor: theme.font}]}>
                                <View style={[css.color, {backgroundColor: item, borderColor: theme.font}]}/>
                            </View>
                        </Pressable>
                    )
                })                
            }
        </View>
    )
}
export default PickColorCard

const css =StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 15,
        flexWrap: "wrap",
        borderWidth: 4,
        padding: 4,
        gap: 10,
    },

    section:{
        borderCurve: "continuous",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,   
        height: 26,   
        width: 35,
        padding: 2
    },

    color: {
        borderCurve: "continuous",
        paddingHorizontal: 14,
        borderRadius: 100,
        borderWidth: 1,
        height: 20,
        width: 20,
    }
});