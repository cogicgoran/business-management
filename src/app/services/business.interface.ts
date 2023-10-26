export interface IEmployee {
    name: string;
    role: string;
    salary: number;
    dateOfBirth: Date;
    phoneNumber: string;
}

export interface IBusiness {
    id: string;
    name: string;
    address: string;
    employees: Array<IEmployee>;
}