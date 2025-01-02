export type DrawerProps = { 
    HojeScreen: undefined,
    CategoriaListScreen: undefined,
    AgendaCategoria:  { uuid:  number | undefined};
    CronometroScreen: { uuid:  number | undefined};
    TarefaViewScreen: { id:    number | undefined};
    CategoriaScreen:  { id:    number | undefined};  
    GalleryScreen:    { uuid?: number | undefined};
    ExternosScreen:   { uuid?: number | undefined} ;
    
    AdicionarTarefa: { 
        id?:  number | undefined, 
        uuid: number | undefined 
    };
};