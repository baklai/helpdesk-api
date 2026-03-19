import * as Bitmask from './bitmask.scope';
import {
  SCOPE_ACTION_OFFSET,
  SCOPE_ACTIONS,
  SCOPE_REGISTRY,
  SCOPE_RESOURCES,
  SCOPES
} from './config.scope';

export type { ScopeKey } from './config.scope';

export type { ScopeAction, ScopeInput, ScopeResource } from './bitmask.scope';

export { SCOPE_ACTION_OFFSET, SCOPE_ACTIONS, SCOPE_REGISTRY, SCOPE_RESOURCES, SCOPES };

export const {
  USER,
  EVENT,
  CHANNEL,
  IPADDRESS,
  MAILBOX,
  REQUEST,
  INSPECTOR,
  REPORT,
  ORGANIZATION,
  SUBDIVISION,
  DEPARTMENT,
  LOCATION,
  POSITION,
  DEVICE
} = SCOPES;

export const UserScope = {
  encode: Bitmask.encodeScopeMask,
  decode: Bitmask.decodeScopeMask,

  toList: Bitmask.decodeScopeToList,
  fromList: Bitmask.encodeScopeList,

  serialize: Bitmask.serializeScopeMask,
  deserialize: Bitmask.deserializeScopeMask,

  has: Bitmask.hasScopes,
  hasAny: Bitmask.hasAnyScope,
  hasList: Bitmask.hasScopeList,

  getBit: Bitmask.getScopeMask
};
