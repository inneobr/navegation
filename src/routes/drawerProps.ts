export type DrawerProps = { 
    HojeScreen: undefined,
    SettingsOpen: undefined,

    AgendaCategoria: {
        categoriaID: number
    }

    CategoriaScreen:{ 
        categoriaID: number 
    };
    
    AdicionarTarefa: { 
        tarefaID: number | any, 
        categoriaID: number | any 
    }; 
};