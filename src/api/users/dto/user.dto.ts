export class UserDto {
  readonly id?: string;
  readonly email?: string;
  readonly password?: string;
  readonly banned?: boolean;
  readonly admin?: boolean;
  readonly name?: string;
  readonly surname: string;
  readonly tel?: string;
  readonly phone_number?: string;
  readonly updated_at: Date;
  readonly userId: string;
}
