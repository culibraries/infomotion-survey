export class Survey {
    response: number;
    comment: string;
    created_date: string;

    constructor(response: number, comment: string, created_date: string) {
        this.response = response;
        this.comment = comment;
        this.created_date = created_date;
    }
}
