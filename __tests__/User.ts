import { AttributeConfigs, Attributes, DynamicAttributeConfig, Entity, Normalizer, StaticAttributeConfig, Validator } from '../src/';

type EmailAttributeConfig = StaticAttributeConfig<string, UserAttributeConfigs> & Required<Pick<StaticAttributeConfig<string, UserAttributeConfigs>, 'value' | 'normalizer' | 'validator'>>;

type EmailDomainAttributeConfig = DynamicAttributeConfig<string, UserAttributeConfigs>;

type UsernameAttributeConfig = StaticAttributeConfig<string, UserAttributeConfigs> & Required<Pick<StaticAttributeConfig<string, UserAttributeConfigs>, 'value' | 'normalizer'>>;

type UuidAttributeConfig = StaticAttributeConfig<string, UserAttributeConfigs> & Required<Pick<StaticAttributeConfig<string, UserAttributeConfigs>, 'normalizer'>> & {
  readonly: true;
};

type VerifiedAttributeConfig = StaticAttributeConfig<boolean, UserAttributeConfigs> & Required<Pick<StaticAttributeConfig<boolean, UserAttributeConfigs>, 'value' | 'normalizer'>>;

interface UserAttributeConfigs extends AttributeConfigs {
  email: EmailAttributeConfig;
  email_domain: EmailDomainAttributeConfig;
  username: UsernameAttributeConfig;
  uuid: UuidAttributeConfig;
  verified: VerifiedAttributeConfig;
};

const userAttributeConfigs:UserAttributeConfigs = {
  email: {
    value: '',
    normalizer: (entity, name, value) => Normalizer.string(value),
    validator: (entity, name, value) => Validator.email(value),
  },
  email_domain: {
    value: (entity, name) => entity.attr('email').split('@', 2)[1],
  },
  username: {
    value: '',
    normalizer: (entity, name, value) => Normalizer.string(value),
    validator: (entity, name, value) => Validator.string(value, { min: 5 }),
  },
  uuid: {
    readonly: true,
    normalizer: (entity, name, value) => Normalizer.string(value),
  },
  verified: {
    value: false,
    normalizer: (entity, name, value) => Normalizer.boolean(value),
  },
};

export class UserEntity extends Entity<UserAttributeConfigs> {

  public constructor(attrs: Partial<Attributes<UserAttributeConfigs>> = {}) {
    super(userAttributeConfigs, attrs);
  }

}
