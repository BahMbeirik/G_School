export interface Etudient {
    id: number
    firstName:string
    phone : number
    adress:string
    email:string
}

export interface Prof{
    id: number
    firstName:string
    matier:string
    email:string
}

export interface Classe{
    id: number
    matier:string
    firstName:string
    heur:Date
}
