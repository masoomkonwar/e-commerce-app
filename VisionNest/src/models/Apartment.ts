export interface productServerRes{
    name : string,
    price : number,
    id : number,
    quantity : number
}

export interface ServerRespond{
     count  : number
     products : productServerRes []

}