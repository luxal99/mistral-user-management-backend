import { IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';
import { UserSortEnum } from '../../enums/UserSortEnum';

export class UserQuery {
  @IsNotEmpty()
  page: number;

  search: string;

  @ValidateIf((object, value) => value)
  @IsEnum(UserSortEnum)
  orderBy: UserSortEnum | null;
  orderByDirection: 'ASC' | 'DESC';
}
