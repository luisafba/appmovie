export interface Producto{
    _id?: string,
    nombre?:string,
    genero?: string,
    anio?: number,
    edad?: number,
    duracion?: number,
    sinopsis?: string,
    imagen?: FileReader,
    clasificacion?: number,
    like?: string,
    dislike?: string,
    director?: string,
    protagonista?: string,
    video?: FileReader
 }