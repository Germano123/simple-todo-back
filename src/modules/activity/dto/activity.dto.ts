import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "../../../common/dto/AbstractDto";
import { Activity } from "../entities/activity.entity";

export class ActivityDto extends AbstractDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;
    
    @ApiProperty()
    ownerId: string;

    constructor(entity: Activity) {
        super(entity);
        this.title = entity.title;
        this.description = entity.description;
        this.ownerId = entity.owner.id;
    }
}
