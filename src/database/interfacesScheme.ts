interface categoriaProps {
    id:     number | any;
    title:  string | any;
    color:  string | any;
}

interface eventosProps {
    id:          number | any;
    title:       string | any;
    description: string | any;
    prioridade:  string | any;
    data:        string | any; 
    hora:        string | any; 
    categoria_id:   number | any;
}

interface imagenProps {
    id:       number;
    title:    string;
    base64:   string;
    tarefa_id:   number;
}

interface cronometroProps {
    id:       number;
    days:     number;
    hours:    number;
    minutes:  number;
    seconds:  number;
    tarefa_id:   number;
}

export { categoriaProps, eventosProps, imagenProps, cronometroProps }