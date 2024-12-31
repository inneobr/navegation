import { RouteProp, useRoute } from "@react-navigation/native";
import { imageProps } from "@/database/interfacesScheme";
import * as tabelaScheme from "@/database/tabelaScheme";

import { DrawerProps } from "@/routes/drawerProps";
import GaleryCard from "@/components/galery.card";
import { drizzle } from "drizzle-orm/expo-sqlite";

import * as ImagePicker from 'expo-image-picker';
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { Alert } from "react-native";

export default function GalleryScreen() {
    const [base64, setBase64] = useState('');
    const [description, setDescription] = useState('');
    const [database, setDatabase] = useState<imageProps[] | any>([]);
    const route = useRoute<RouteProp<DrawerProps, 'GalleryScreen'>>();

    const usql = useSQLiteContext();
    const execute = drizzle(usql, { schema: tabelaScheme }); 

    async function findByUuid() { 
        let tafefa_id = Number(route.params.uuid);
        try {
            const result = await execute.query.image.findMany({
                where: ((uuid, { eq }) => eq(tabelaScheme.image.uuid, tafefa_id))
            }); 
            setDatabase(result);
        } catch (error) {
            console.log(error)
        }
    };

    async function onSave() { 
        let tafefa_id = Number(route.params.uuid);
        if(base64.length < 20) return
        try {             
          await execute.insert(tabelaScheme.image)
            .values({ uuid: tafefa_id, base64, description });  
        } catch (error) {
          console.log(error);
        }        
    } 

    const handlerDelete = (id: number) => { 
            Alert.alert('', 'Deseja apagar a imagem?', [
                { text: "Cancelar" },
                { text: "Confirmar", onPress: () => onDelete(id) },
            ]);
        }

    async function onDelete(id: number){        
        try {
            await execute.delete(tabelaScheme.image)
            .where(eq(tabelaScheme.image.id, id));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { 
        onSave()
    },[base64]);

    useEffect(() => { 
        if(route.params.uuid){
            findByUuid()
        }         
    },[database]);

    const openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          base64: true,
          aspect: [9, 16],
          quality: 1,
        });
    
        if (!result.canceled) {            
            if(result.assets[0]?.base64) {                
                setBase64(result.assets[0]?.base64);
                setDescription(String(result.assets[0]?.fileName));
            }                    
        }
    };

    return (           
        <GaleryCard images={database} 
            openGalery={()=> openGallery()} 
            deleteImage={handlerDelete}
        />       
    );
}