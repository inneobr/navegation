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
    categoria:   number | any;
}

interface imagenProps {
    id:       number;
    title:    string;
    base64:   string;
    tarefa:  number;
}

interface cronometroProps {
    id:       number;
    days:     number;
    hours:    number;
    minutes:  number;
    seconds:  number;
    tarefa:  number;
}

export { categoriaProps, eventosProps, imagenProps, cronometroProps }