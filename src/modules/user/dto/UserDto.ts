import { AbstractDto } from '../../../common/dto/AbstractDto';
import { User } from '../entities/user.entity';

export class UserDto extends AbstractDto {
    constructor(entity: User) {
        super(entity);
    }
}
