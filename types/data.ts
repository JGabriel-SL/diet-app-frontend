interface RefeicoesProps {
    horario:  string;
    nome: string;
    alimentos: string[];
}

export interface Data {
    nome: string;
    sexo: string;
    objetivo: number;
    altura: number;
    peso: number;
    idade: number;
    refeicoes: RefeicoesProps[];
    suplementos: string[];
}