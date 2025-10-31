import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateBookmarkDTO {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    url?: string;
}