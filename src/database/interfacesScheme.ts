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

interface imageProps {
    id:          number; 
    uuid:        number;
    base64:      string;
    description: string;
}

interface externosProps {
    id:    number;
    uuid:  string;
    url:   number;
    title: string;
}

interface cronometroProps {
    id:        number;
    days:      number;
    hours:     number;
    minutes:   number;
    seconds:   number;
    tarefa_id: number;
}

export { categoriaProps, eventosProps, imageProps, cronometroProps, externosProps }