import { AbstractDto } from "./dto/AbstractDto";

export class ApiResponse {
    status: number;
    message?: string;
    data?: any;

    constructor(status: number, message: string, data: AbstractDto | AbstractDto[] ) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
