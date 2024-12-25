import { DrawerToggleButton } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HeaderCard = () => { 
    return (
        <View style={[styles.container, {backgroundColor: '#18181B' }]}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, {color: '#FFF'}]}>Planner</Text>
                <MaterialIcons name="arrow-right" size={22} color={'#FFF'}/> 
            </View>           
            <DrawerToggleButton tintColor={'#FFF'}/>
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