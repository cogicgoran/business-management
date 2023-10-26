import { IBusiness } from "src/app/services/business.interface";

export const DUMMY_BUSINESSES: Array<IBusiness> = [
    {
        id: '1',
        name: 'Business One',
        address: 'Address One',
        employees: [],
    },
    {
        id: '2',
        name: 'Business Two',
        address: 'Address Two',
        employees: [{ name: 'Jason Bro', dateOfBirth: new Date('11/11/1995'), phoneNumber: '+381 624423423', role: 'Janitor', salary: 40_000 }]
    },
    {
        id: '3',
        name: 'Business Three',
        address: 'Address Three',
        employees: [
            { name: 'John Doe Coo', dateOfBirth: new Date('05/05/1983'), phoneNumber: '+381 69535353', role: 'COO', salary: 360_000 },
            { name: 'John Doe', dateOfBirth: new Date('05/09/1989'), phoneNumber: '+381 3240423', role: 'Janitor', salary: 34_000 },
            { name: 'Jane Doe', dateOfBirth: new Date('09/02/1991'), phoneNumber: '+381 4848000', role: 'Junior Software Developer', salary: 90_000 },
            { name: 'Janas Doesi', dateOfBirth: new Date('08/21/1994'), phoneNumber: '+381 3232322', role: 'Medior Software Developer', salary: 130_000 }
        ]
    }
]