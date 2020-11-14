import { isNegative } from '@typescript-entity/validators';
import { numberConfig } from './numberConfig';
import type { NumberConfigFactory } from './numberConfig';

export type NegativeNumberConfigFactory<
  Optional extends boolean = false,
  Hidden extends boolean = false,
  Immutable extends boolean = false,
  Normalizer extends boolean = false
> = NumberConfigFactory<Optional, Hidden, Immutable, Normalizer, true>;

export const negativeNumberConfig = <
  O extends boolean = false,
  H extends boolean = false,
  R extends boolean = false
>(optional?: O, hidden?: H, immutable?: R): NegativeNumberConfigFactory<O, H, R> => ({
  ...numberConfig(optional, hidden, immutable),
  validator: isNegative,
});
