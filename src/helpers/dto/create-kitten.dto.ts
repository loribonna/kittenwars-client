import { Length, Min, Max, IsInt, IsDate, IsMongoId, IsOptional } from 'class-validator';
import { IKitten } from '../interfaces';
import { DtoBase } from './dto.base';


export class CreateKittenDto extends DtoBase {
    constructor(kitten: Partial<IKitten>) {
        super()
        this.name=kitten.name as string;
        this.age=kitten.age as number;
    }

	@Length(1, 40)
	name: String;

    @IsOptional()
	@IsInt()
	@Min(0)
    @Max(30)
	age: Number;
}
