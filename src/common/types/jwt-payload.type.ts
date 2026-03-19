import { UserRole } from 'src/common/enums/user-role.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';

export interface JwtPayload {
  id: string;
  email: string;
  fullname?: string;
  status?: UserStatus;
  role?: UserRole;
  /** Серіалізований BigInt bitmask прав доступу */
  scope?: string;
}
