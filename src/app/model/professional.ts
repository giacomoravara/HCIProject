import { Appointment } from './appointment';
import { ServiceType } from './service-type';

export class Professional {
id: number;
name: string;
phone: string;
services: ServiceType[];
location: string;
category: string;
images?: string[];
appointments: Appointment[];
email: string;
password: string;
distance?: number;

}

