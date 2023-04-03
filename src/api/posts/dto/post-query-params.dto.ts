import { IsNumberString, IsOptional } from 'class-validator';

export class PostQueryParamsDto {
  @IsOptional()
  @IsNumberString()
  _limit?: number;

  @IsOptional()
  @IsNumberString()
  _page?: number;

  @IsOptional()
  @IsNumberString()
  _search?: string;
}
