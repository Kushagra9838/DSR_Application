// src/dsr/dto/update-dsr.dto.ts
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateDsrDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @Min(0)
  @Max(8)
  @IsOptional()
  hours?: number;
}
