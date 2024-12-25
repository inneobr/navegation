import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "@/utils/data/colors";

type Props = {
    filter: string;
    onChange: (color: string ) => void;
}

const PickColorCard = ({filter, onChange, ...rest}: Props) => {   
    return (
        <View style={css.container}>
            {
                colors && colors.map((item, index) => {
                    let isActive = filter === item;
                    let  borderWidth = isActive? 2 : 0
                    return (
                        <Pressable onPress={() => onChange(item)} key={item}>
                            <View style={[css.section, {borderWidth}]}>
                                <View style={[css.color, {backgroundColor: item}]}/>
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
        flexWrap: "wrap",
        gap: 10,
    },

    section:{
        borderCurve: "continuous",
        justifyContent: "center",
        borderColor: "#F06543",
        alignItems: "center",
        borderRadius: 100,   
        height: 35,   
        width: 35,
        padding: 2
    },

    color: {
        borderCurve: "continuous",
        borderColor: "#c0c0c0",
        paddingHorizontal: 14,
        borderRadius: 100,
        borderWidth: 1,
        height: 30,
        width: 30,
    }
});