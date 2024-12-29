import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { imageProps } from '@/database/interfacesScheme';
const { width, height } = Dimensions.get('window');

import { MaterialIcons } from '@expo/vector-icons';
import { EmptyContent } from './emptyContent';
import { useRef } from 'react';

type Props = {
    images: imageProps[],
    openGalery:  ()=> void,
    deleteImage: (id: number)=> void 
}

export default function GaleryCard({images, openGalery, deleteImage}: Props) {
    const topRef = useRef<FlatList>(null);
    const thumbRef = useRef<FlatList>(null);

    const scrollActiveIndex = (index: number): void => {
        topRef?.current?.scrollToOffset({
            offset: index * width, 
            animated: true, 
        });

        const thumbnailOffset = index * (90) - (width / 2) + (80 / 2);
        if (thumbnailOffset > 0) {
            thumbRef?.current?.scrollToOffset({
                offset: thumbnailOffset,
                animated: true,
            });
        } else {
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated: true,
            });
        }
    };

    return (
        <View style={css.container}>
            <FlatList
                horizontal
                ref={topRef}
                data={images}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={images.length === 0 && css.emptySection } 
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (                    
                    <View style={{ width, height }}>
                        <Image source={{ uri:  'data:image/jpeg;base64,'+ item?.base64 }} style={StyleSheet.absoluteFillObject} />
                    </View>
                )}
                ListEmptyComponent={() => ( 
                    <EmptyContent title={"Nada por aqui"} message={"Não existem imagens cadastradas"}/>
                )}
            />

            <FlatList
                horizontal
                ref={thumbRef}
                data={images}
                keyExtractor={(item) => item.id.toString()}
                style={css.gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{flexDirection: "column", height: 90, width: 90}}> 
                        <TouchableOpacity onPress={()=> scrollActiveIndex(index)}>                 
                            <Image source={{ uri: 'data:image/jpeg;base64,'+ item?.base64 }} style={css.thumbnail}/>
                        </TouchableOpacity> 

                        <TouchableOpacity onPress={()=> deleteImage(item.id)}>
                            <MaterialIcons name='delete' color={'red'}  size={18} style={{position: "absolute", bottom: 8, right: 15, opacity: 0.5}}/>
                        </TouchableOpacity>
                    </View> 
                )}
            />

            <View style={{ flexDirection: "row", gap: 4, position: "absolute", top: 14, left:14}}>               
                <TouchableOpacity onPress={()=> openGalery()} style={{backgroundColor: "#18181B", borderRadius: 8, padding: 14}}>                    
                    <MaterialIcons name="add-a-photo" color={'#fff'} size={18}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const css = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        height: "100%",
        width: width,
    },

    gallery: {
        paddingHorizontal: 10,   
        position: 'absolute',
        borderRadius: 8,
        margin: 16,
        bottom: 14,
    },

    thumbnail: {
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 12,
        marginRight: 10,
        height: 80,
        width:  80,
    },

    emptySection: {
        justifyContent: "center", 
        borderRadius: 8,
        flex: 1
      },
});