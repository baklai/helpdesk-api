const STEP = 5n;

const RESOURCES = [
  'user',
  'event',
  'channel',
  'ipaddress',
  'mailbox',
  'request',
  'inspector',
  'report',
  'organization',
  'subdivision',
  'department',
  'location',
  'position',
  'device'
] as const;

export const SCOPE_REGISTRY = Object.freeze(
  Object.fromEntries(RESOURCES.map((name, index) => [name, { bit: BigInt(index) * STEP }]))
) as Record<ScopeResource, { bit: bigint }>;

export const SCOPE_ACTION_OFFSET = Object.freeze({
  create: 0n,
  read: 1n,
  update: 2n,
  delete: 3n,
  notice: 4n
} as const);

export type ScopeResource = (typeof RESOURCES)[number];

export type ScopeAction = keyof typeof SCOPE_ACTION_OFFSET;

export type ScopeKey = `${ScopeResource}:${ScopeAction}`;

export const SCOPE_RESOURCES = Object.keys(SCOPE_REGISTRY) as ScopeResource[];

export const SCOPE_ACTIONS = Object.keys(SCOPE_ACTION_OFFSET) as ScopeAction[];

type ResourceActions<R extends string> = {
  [A in ScopeAction as Uppercase<A>]: `${R}:${A}`;
};

type ScopesConfig = {
  [R in ScopeResource as Uppercase<R>]: ResourceActions<R>;
};

export const SCOPES = RESOURCES.reduce((acc, res) => {
  const actions = {} as any;
  (Object.keys(SCOPE_ACTION_OFFSET) as ScopeAction[]).forEach(action => {
    actions[action.toUpperCase()] = `${res}:${action}`;
  });
  acc[res.toUpperCase() as Uppercase<ScopeResource>] = actions;
  return acc;
}, {} as any) as ScopesConfig;
