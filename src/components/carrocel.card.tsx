import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CardHorizontal, CardVertical } from "@/theme/component";

import { DrawerNavigationProp } from "@react-navigation/drawer";
import { imageProps } from "@/database/interfacesScheme";
import * as tabelaScheme from "@/database/tabelaScheme";

import { MaterialIcons } from "@expo/vector-icons";
import { DrawerProps } from "@/routes/drawerProps";
import { drizzle } from "drizzle-orm/expo-sqlite";

import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useTheme } from "@/customs";

type Props = { uuid: number | undefined }
const Carrocel = ({uuid}: Props ) => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerProps>>(); 
    const [database, setDatabase] = useState<imageProps[] | any>([]);
    const theme = useTheme();

    const usql = useSQLiteContext();
    const execute = drizzle(usql, { schema: tabelaScheme }); 

    async function findByUuid() { 
        let tafefa_id = Number(uuid);
        try {
            const result = await execute.query.image.findMany({
                where: ((uuid, { eq }) => eq(tabelaScheme.image.uuid, tafefa_id))
            }); 
            setDatabase(result);
        } catch (error) {
            console.log(error)
        }
    };

    const handlerGalery = () => {
        let tafefa_id = Number(uuid);
        navigation.navigate("GalleryScreen", {uuid: tafefa_id})
    }

    useEffect(() => { 
        if(uuid !== undefined) {            
            findByUuid()
        }else {
            navigation.goBack()
        }
    },[database]);

    return (
        <CardVertical style={{maxHeight: 110}}>
            <FlatList
                horizontal
                data={database}
                style={css.gallery}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={
                <TouchableOpacity style={[css.thumbadd, {backgroundColor: theme.base, }]} onPress={()=> handlerGalery()}>
                    <MaterialIcons name="add" size={22} color={theme.tint} />
                </TouchableOpacity>
                }
                renderItem={({ item, index }) => (
                    <CardHorizontal style={{flexDirection: "column", height: 90, width: 90}}> 
                        <TouchableOpacity onPress={()=> handlerGalery()}>                 
                            <Image source={{ uri: 'data:image/jpeg;base64,'+ item?.base64 }} style={css.thumbnail}/>
                        </TouchableOpacity> 
                    </CardHorizontal> 
                )}
            />
        </CardVertical>
    )
}
export default Carrocel

const css = StyleSheet.create({
    thumbnail: {
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 12,
        marginRight: 10,
        height: 75,
        width:  75,
        gap: 8
    },

    thumbadd: {        
        justifyContent: "center",
        height: 80, width: 80, 
        borderRadius: 12, 
        marginRight: 10,
        alignItems: "center", 
    },

    gallery: {
        borderRadius: 8,
    },
})