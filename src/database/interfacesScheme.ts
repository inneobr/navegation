interface categoriaProps {
    id:     number;
    title:  string;
    color:  string;
}

interface eventosProps {
    id:          number;
    uuid:        number
    title:       string;
    description: string;
    data:        string; 
    hora:        string; 
}

interface imageProps {
    id:          number; 
    uuid:        number;
    base64:      string;
    description: string;
}

interface externosProps {
    id:    number;
    uuid:  number;
    url:   number;
    title: string;
}

interface todolistProps {
    id:             number;
    uuid:           number;
    description:    string;
    active:         number;
}


interface cronometroProps {
    id:        number;
    uuid:      number
    days:      number;
    hours:     number;
    minutes:   number;
    seconds:   number;
}

export { categoriaProps, eventosProps, imageProps, cronometroProps, externosProps, todolistProps }