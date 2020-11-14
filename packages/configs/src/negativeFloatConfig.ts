import { isNegative } from '@typescript-entity/validators';
import { floatConfig } from './floatConfig';
import type { FloatConfigFactory } from './floatConfig';

export type NegativeFloatConfigFactory<
  Optional extends boolean = false,
  Hidden extends boolean = false,
  Immutable extends boolean = false,
  Normalizer extends boolean = false
> = FloatConfigFactory<Optional, Hidden, Immutable, Normalizer, true>;

export const negativeFloatConfig = <
  O extends boolean = false,
  H extends boolean = false,
  R extends boolean = false
>(optional?: O, hidden?: H, immutable?: R): NegativeFloatConfigFactory<O, H, R> => ({
  ...floatConfig(optional, hidden, immutable),
  validator: isNegative,
});
