import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView, useBottomSheetSpringConfigs } from "@gorhom/bottom-sheet"
import React, { useCallback, useMemo, useRef, useState } from "react";
import { eventosProps } from "@/database/interfacesScheme";

import * as tabelaScheme from "@/database/tabelaScheme";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

import CalendarCard from "./calendar.card";
import { StyleSheet } from "react-native";
import { useTheme } from "@/customs";

type Props = {
    onChange: (date: string ) => void
}

const BotonSheetCard = ({onChange, ...rest}: Props) => {
    const [database,    setDatabase    ] = useState<eventosProps[]>([]);
    const snapPoints = useMemo(() => ["3%","48%"], []);
    
    const usql = useSQLiteContext();
    const execute = drizzle(usql, { schema: tabelaScheme });

    async function findAll() { 
        try {
            const dados = await execute.query.tarefa.findMany();        
            setDatabase(dados);
        } catch (error) {
            console.log(error)
        }
    }

    const animationConfigs = useBottomSheetSpringConfigs({
        restDisplacementThreshold: 0.1,
        overshootClamping: true,
        restSpeedThreshold: 0.1,
        stiffness: 20,
        duration: 500, 
        damping: 20,    
    });

    const bottomSheetRef = useRef<BottomSheet>(null);  

    const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={0}
				appearsOnIndex={0}
			/>
		),[]
	);

    const theme = useTheme()
    return (
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} animationConfigs={animationConfigs} 
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{backgroundColor: theme.tint}}  
            backgroundStyle={{backgroundColor: "transparent", marginBottom: 30}}>
            <BottomSheetView>
                <CalendarCard tarefas={database} onChange={onChange}/>
            </BottomSheetView>
        </BottomSheet>
    )
}
export default BotonSheetCard

const css = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius:  20,
        borderTopRightRadius: 20
    }
});