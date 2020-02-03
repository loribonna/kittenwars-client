import { IsBoolean, IsMongoId } from 'class-validator';
import { DtoBase } from './dto.base';

export class KittenEvaluateDto extends DtoBase {
    constructor(obj: any){
        super();
        this.accepted=obj?.accepted;
        this.kittenId=obj?.kittenId;
    }
    

    @IsBoolean()
    accepted: Boolean;

    @IsMongoId()
    kittenId: String;
}
