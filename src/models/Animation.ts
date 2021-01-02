import {Parameter} from '@/models/Parameter'


export class LedstripAnimation {

    name: string;
    parameters: Parameter[]
    id?: number

    constructor(name: string, parameters: Parameter[], id: number) {
        this.name = name
        this.parameters = parameters
        this.id = id
    }
}