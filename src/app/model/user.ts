import { Appointment } from './appointment';
import { Professional } from './professional';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    user?: string;
    password?: string;
    phone: string;
    email: string;
    favorites?: Professional[];
    appointments?: Appointment[];
    //characteristics: String;
 
}
