import { Entity } from '@typescript-entity/core';
import type { AttrName } from '@typescript-entity/core';
import { toInteger, toString } from '@typescript-entity/sanitizers';
import { number } from './number';
import type { NumberAttrConfigFactory } from './number';

export type IntegerAttrConfigFactory<
  Optional extends boolean = false,
  Hidden extends boolean = false,
  Immutable extends boolean = false,
  Normalizer extends boolean = false,
  Validator extends boolean = false
> = NumberAttrConfigFactory<Optional, Hidden, Immutable, Normalizer, Validator>;

export const integer = <
  O extends boolean = false,
  H extends boolean = false,
  R extends boolean = false
>(optional?: O, hidden?: H, immutable?: R): IntegerAttrConfigFactory<O, H, R> => ({
  ...number(optional, hidden, immutable),
  sanitizer: (
    optional
      ? function(this: Entity, value: unknown, name: AttrName): number | null {
        return toString(value) ? toInteger.bind(this)(value, name) : null;
      }
      : toInteger
  ),
} as unknown as IntegerAttrConfigFactory<O, H, R>);
