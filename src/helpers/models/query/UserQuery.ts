import { IsEnum, IsNotEmpty, IsPositive, ValidateIf } from 'class-validator';
import { UserSortEnum } from '../../enums/UserSortEnum';
import { Transform } from 'class-transformer';
import { OrderEnum } from '../../enums/OrderEnum';

export class UserQuery {
  @Transform(({ value }) => {
    if (value >= 0) {
      return value;
    } else {
      return null;
    }
  })
  @IsNotEmpty()
  page: number;

  search: string;

  @ValidateIf((object, value) => value)
  @IsEnum(UserSortEnum)
  orderBy: UserSortEnum | null;

  @ValidateIf((object, value) => value)
  @IsEnum(OrderEnum)
  orderByDirection: 'ASC' | 'DESC';
}
