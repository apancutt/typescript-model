import { Entity } from '@typescript-entity/core';
import type { AttrName } from '@typescript-entity/core';
import { toDate, toString } from '@typescript-entity/sanitizers';
import type { WritableAttrConfigFactory } from './AttrConfigFactory';

export type DateConfigFactory<
  Optional extends boolean = false,
  Hidden extends boolean = false,
  Immutable extends boolean = false,
  Normalizer extends boolean = false,
  Validator extends boolean = false
> = WritableAttrConfigFactory<Date, Optional, Hidden, Immutable, Normalizer, Validator>;

export const dateConfig = <
  O extends boolean = false,
  H extends boolean = false,
  R extends boolean = false
>(optional?: O, hidden?: H, immutable?: R): DateConfigFactory<O, H, R> => ({
  hidden,
  immutable,
  value: optional ? null : new Date(0),
  sanitizer: (
    optional
      ? function(this: Entity, value: unknown, name: AttrName): Date | null {
        return toString(value) ? toDate.bind(this)(value, name) : null;
      }
      : toDate
  ),
} as unknown as DateConfigFactory<O, H, R>);
