import { registerEnumType } from '@nestjs/graphql';

/**
 * Статуси життєвого циклу облікового запису.
 * Використовуються в UserStatusGuard для глобального обмеження доступу.
 */
export enum UserStatus {
  /** Очікує підтвердження або активації адміністратором */
  PENDING = 'pending',

  /** Обліковий запис активний, доступ дозволено */
  ACTIVE = 'active',

  /** Доступ обмежено адміністратором (наприклад, за порушення) */
  BLOCKED = 'blocked',

  /** Деактивовано (наприклад, у зв'язку зі звільненням) */
  DISABLED = 'disabled'
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'Поточний стан облікового запису користувача'
});
