import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/settings";

const Stack= createStackNavigator();
export default function StackRoutes(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Settings}/>
        </Stack.Navigator>
    )
}