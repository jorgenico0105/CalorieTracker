export type Category ={
    id:number
    name:string
}
export type Activity={
    id:string
    category: number, // Default value should be an empty string or the first category ID
    name: string,
    calories: number 
}
