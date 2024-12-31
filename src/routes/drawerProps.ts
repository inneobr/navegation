export type DrawerProps = { 
    HojeScreen: undefined,
    SettingsOpen: undefined,

    AgendaCategoria: {
        CAT_ID: number
    }

    CategoriaScreen:{ 
        CAT_ID: number 
    };
    
    AdicionarTarefa: { 
        ID: number | any, 
        CAT_ID: number | any 
    };

    CronometroScreen: { ID: number}

    TarefaViewScreen: { ID: number }
    GalleryScreen:  { uuid?: number | undefined}
    ExternosScreen: { uuid?: number | undefined}
};