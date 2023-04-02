export class PaginationOptionsDto {
    page?: number = 1;
    limit?: number = 10;
    sort?: string = '-createdAt';
}
