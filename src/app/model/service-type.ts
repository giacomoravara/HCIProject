export class ServiceType{
    id: number;
    name: string;
    price: number;
    duration: number;
    category: string;


constructor(i?: number, name?: string, price?: number, duration?: number, category?: string){
    this.id = i;
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.category = category;

}

}

