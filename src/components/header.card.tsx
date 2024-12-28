import { DrawerToggleButton } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/customs";

const HeaderCard = () => { 
    const theme = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: theme.base }]}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, {color: theme.font}]}>Planner</Text>
                <MaterialIcons name="arrow-right" size={22} color={theme.font}/> 
            </View>           
            <DrawerToggleButton tintColor={theme.font}/>
        </View>
    )
}
export default HeaderCard

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
    },  
    
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    title: {
        fontSize: 22,
        fontWeight: '500'
    }
})