import { registerEnumType } from '@nestjs/graphql';

/**
 * Рівні важливості повідомлень та подій.
 * Використовується для візуального кодування статусів у системі.
 */
export enum NoticeStatusType {
  /** Успішне завершення операції */
  SUCCESS = 'success',

  /** Інформаційне повідомлення або системна зміна */
  INFO = 'info',

  /** Попередження про потенційну проблему або видалення */
  WARN = 'warn',

  /** Помилка виконання або критична подія */
  ERROR = 'error',

  /** Допоміжна або нейтральна інформація */
  SECONDARY = 'secondary'
}

registerEnumType(NoticeStatusType, {
  name: 'NoticeStatusType',
  description: 'Статус системних повідомлень'
});

/**
 * Перелік Інтернет статусів.
 * Використовується для категоризації статусу доступу до мережі Інтернет.
 */
export enum InternetStatusType {
  /** Відсутній доступ */
  NONE = 'none',

  /** Доступ надано */
  ACTIVE = 'active',

  /** Доступ заблоковано */
  BLOCKED = 'blocked',

  /** Доступ закритий */
  CLOSED = 'closed'
}

registerEnumType(InternetStatusType, {
  name: 'InternetStatusType',
  description: 'Статус доступу до Інтернету'
});

/**
 * Статус електронної пошти.
 * Використовується для категоризації статусу.
 */
export enum MailboxStatusType {
  /** Доступ надано */
  OPENED = 'opened',

  /** Доступ заблоковано */
  BLOCKED = 'blocked',

  /** Доступ закритий */
  CLOSED = 'closed'
}

registerEnumType(MailboxStatusType, {
  name: 'MailboxStatusType',
  description: 'Статус електронної пошти'
});

/**
 * Статус заявок.
 * Використовується для категоризації заявок.
 */
export enum RequestStatusType {
  /** Заявка щойно створена користувачем і зареєстрована в системі. Ще не була переглянута або прийнята в роботу. */
  OPENED = 'opened',

  /** Заявка очікує розгляду або призначення відповідального спеціаліста. */
  PENDING = 'pending',

  /** Заявка прийнята в роботу. Спеціаліст виконує дії для вирішення описаної проблеми. */
  PROCESSING = 'processing',

  /** Проблему вирішено. Очікується підтвердження від користувача або перевірка результату. За потреби заявку ще можна відкрити повторно. */
  RESOLVED = 'resolved',

  /** Заявка остаточно закрита після підтвердження вирішення. Подальші зміни або повторне відкриття неможливі. */
  CLOSED = 'closed',

  /** Заявку відхилено після перевірки (наприклад, через некоректні дані або невідповідність правилам). */
  REJECTED = 'rejected',

  /** Заявку скасовано користувачем або адміністратором до завершення її обробки. */
  CANCELLED = 'cancelled'
}

registerEnumType(RequestStatusType, {
  name: 'RequestStatusType',
  description: 'Статус заявки'
});
