import { CalendarEvent } from 'angular-calendar';
import { Professional } from './professional';
import { ServiceType } from './service-type';
import { User } from './user';

export class Appointment {
    
    id: number;
    user: User;
    professional: Professional;
    services?: ServiceType[];
	start: string;
    finish: string;
    notes?: string;
    totDuration?: number;
    totPrice?: number;
}

