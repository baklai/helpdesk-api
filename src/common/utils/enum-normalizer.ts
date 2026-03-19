import { EventType } from 'src/common/enums/event.enum';
import {
  InternetStatusType,
  MailboxStatusType,
  NoticeStatusType,
  RequestStatusType
} from 'src/common/enums/status.enum';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';

const GRAPHQL_ENUM_KEY_TO_DB_VALUE = new Map<string, string>([
  ...Object.entries(RequestStatusType),
  ...Object.entries(InternetStatusType),
  ...Object.entries(MailboxStatusType),
  ...Object.entries(NoticeStatusType),
  ...Object.entries(UserStatus),
  ...Object.entries(UserRole),
  ...Object.entries(EventType)
]);

type FilterValue = string | number | boolean | null | FilterObject | FilterValue[];
type FilterObject = { [key: string]: FilterValue };

function normalizeEnumValue(value: FilterValue): FilterValue {
  if (typeof value !== 'string') return value;
  return GRAPHQL_ENUM_KEY_TO_DB_VALUE.get(value) ?? value;
}

export function normalizeEnumFilters(obj: FilterObject): FilterObject {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (key === '$eq' || key === '$ne') {
        return [key, normalizeEnumValue(value)];
      }

      if ((key === '$in' || key === '$nin') && Array.isArray(value)) {
        return [key, value.map(normalizeEnumValue)];
      }

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return [key, normalizeEnumFilters(value as FilterObject)];
      }

      if (Array.isArray(value)) {
        return [
          key,
          value.map(item =>
            typeof item === 'object' && item !== null && !Array.isArray(item)
              ? normalizeEnumFilters(item as FilterObject)
              : normalizeEnumValue(item)
          )
        ];
      }

      return [key, normalizeEnumValue(value)];
    })
  );
}
