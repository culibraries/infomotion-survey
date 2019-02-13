export class Survey {
    response: string;
    comment: string;
    created_date: string;

    constructor(response: string, comment: string, created_date: string) {
        this.response = response;
        this.comment = comment;
        this.created_date = created_date;
    }
}
