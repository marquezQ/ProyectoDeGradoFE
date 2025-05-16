import { ContractWithClientAndWorker } from "./ContractInterface";

export interface Review {
    id: string,
    contrato_id: string,
    comment: string,
    recommend: boolean,
    images: ReviewImages,
    calificacion: Calification,
    contrato: ContractWithClientAndWorker
    created_at: string
}


interface ReviewImages{
    image1: string,
    image2: string,
    image3: string,

}

export interface Calification{
    id: string,
    reseña_id: string,
    time: number,
    quality: number,
    communication: number,
    price: number,
    final: number,
}