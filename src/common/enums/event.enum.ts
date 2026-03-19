import { registerEnumType } from '@nestjs/graphql';

/**
 * Перелік типів подій.
 * Використовується для категоризації в календарі або журналі подій.
 */
export enum EventType {
  /** Загальна подія без специфічної категорії */
  EVENT = 'event',

  /** Робоча зустріч або засідання */
  MEETING = 'meeting',

  /** Вебінар або віртуальний захід */
  WEBINAR = 'webinar',

  /** Конференція (багатосесійна подія) */
  CONFERENCE = 'conference',

  /** Практикум, тренінг або навчальний семінар */
  WORKSHOP = 'workshop',

  /** Державне, професійне або національне свято */
  HOLIDAY = 'holiday',

  /** Розважальний захід (концерт, виставка тощо) */
  ENTERTAINMENT = 'entertainment',

  /** Публічний виступ, лекція або доповідь */
  LECTURE = 'lecture',

  /** Інші типи подій */
  OTHER = 'other'
}

registerEnumType(EventType, {
  name: 'EventType',
  description: 'Класифікація типів подій'
});
