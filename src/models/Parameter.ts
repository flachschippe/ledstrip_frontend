export class Parameter {

    name: string;
    type: string;
    value: string;
    minimum?: number;
    maximum?: number;

    constructor(name: string,
                value: string,
                type: string,
                minimum?: number,
                maximum?: number) {
        this.name = name
        this.type = type
        this.value = value
        this.minimum = minimum
        this.maximum = maximum
    }
}

