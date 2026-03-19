import { registerEnumType } from '@nestjs/graphql';

/**
 * Рівні доступу користувачів.
 * Визначає повноваження в межах Guard-системи (UserRoleGuard).
 */
export enum UserRole {
  /** Повний доступ до всіх модулів, налаштувань та логів аудиту */
  ADMIN = 'admin',

  /** Управління звітами, перегляд статистики та базове адміністрування */
  MANAGER = 'manager',

  /** Операційна робота: обробка заявок, керування IP-адресами та технікою */
  SUPPORT = 'support',

  /** Тільки перегляд доступних ресурсів (без права редагування) */
  CLIENT = 'client'
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Ролі користувачів для контролю доступу (RBAC)'
});
