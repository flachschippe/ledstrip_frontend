


export class LedstripAnimation {
    
    name: string;
    parameters: Record<string, string>
    id?: number

    constructor(name: string, parameters: Record<string, string>, id: number) {
        this.name = name
        this.parameters = parameters
        this.id = id
    }
}

