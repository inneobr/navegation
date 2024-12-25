import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import HeaderCard from "@/components/header.card";
import DrawerRoutes from "./drawer.routes";

export default function Routes(){
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <HeaderCard /> 
                    <DrawerRoutes />
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}