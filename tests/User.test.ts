import { ReadOnlyError, UnconfiguredAttrError, ValidationError } from '../packages/core/src/';
import type { ResolveAttrSet, ResolveMutableAttrSet } from '../packages/core/src/';
import { User } from './User';
import type { UserAttrConfigSet } from './User';

test('an Entity can be constructed with default values', () => {

  const user = new User();
  expect(user).toBeInstanceOf(User);
  expect(user.date_of_birth).toBeInstanceOf(Date);
  expect(user.email).toStrictEqual('');
  expect(user.email_domain).toStrictEqual(null);
  expect(user.username).toStrictEqual('');
  expect(user.uuid).toStrictEqual(null);
  expect(user.verified).toStrictEqual(false);

});

test('an Entity can be constructed with custom values', () => {

  const user = new User({
    date_of_birth: new Date('2000-01-01'),
    email: 'foo@example.com',
    username: 'foobar',
    uuid: '7a2d2178-37da-4f5c-bb05-5f6819ff6ecd',
    verified: true,
  });
  expect(user.date_of_birth).toBeInstanceOf(Date);
  expect(user.email).toStrictEqual('foo@example.com');
  expect(user.email_domain).toStrictEqual('example.com');
  expect(user.username).toStrictEqual('foobar');
  expect(user.uuid).toStrictEqual('7a2d2178-37da-4f5c-bb05-5f6819ff6ecd');
  expect(user.verified).toStrictEqual(true);

});

test('an Entity can be filled with custom values later', () => {

  const user = new User();
  user.fill({
    date_of_birth: new Date('2000-01-01'),
    email: 'foo@example.com',
    username: 'foobar',
  });
  expect(user.date_of_birth).toBeInstanceOf(Date);
  expect(user.email).toStrictEqual('foo@example.com');
  expect(user.email_domain).toStrictEqual('example.com');
  expect(user.username).toStrictEqual('foobar');
  expect(user.verified).toStrictEqual(false);

});

test('an Entity cannot be filled with values for immutable attributes later', () => {

  expect(() => {
    const user = new User();
    user.fill({ uuid: '7a2d2178-37da-4f5c-bb05-5f6819ff6ecd' } as unknown as ResolveMutableAttrSet<UserAttrConfigSet>);
  }).toThrow(ReadOnlyError);

});

test('an Entity cannot be constructed with invalid values', () => {

  expect(() => {
    new User({ username: 'abc' });
  }).toThrow(ValidationError);

});

test('an Entity cannot be filled with invalid values later', () => {

  const user = new User();
  expect(() => {
    user.fill({ username: 'abc' });
  }).toThrow(ValidationError);

});

test('an Entity can expose all attributes', () => {

  const attrs = {
    date_of_birth: new Date('2000-01-01'),
    email: 'foo@example.com',
    username: 'foobar',
    uuid: '7a2d2178-37da-4f5c-bb05-5f6819ff6ecd',
    verified: true,
  };
  const expected = {
    ...attrs,
    email_domain: 'example.com',
  };
  const user = new User(attrs);
  expect(user.all()).toStrictEqual(expected);

});

test('an Entity can expose some attributes', () => {

  const attrs = {
    date_of_birth: new Date('2000-01-01'),
    email: 'foo@example.com',
    username: 'foobar',
    uuid: '7a2d2178-37da-4f5c-bb05-5f6819ff6ecd',
    verified: true,
  };
  const expected = {
    username: attrs.username,
    verified: attrs.verified,
  };
  const user = new User(attrs);
  expect(user.many(Object.keys(expected) as (keyof ResolveAttrSet<UserAttrConfigSet>)[])).toStrictEqual(expected);

});

test('an Entity can expose all visible attributes', () => {

  const attrs = {
    date_of_birth: new Date('2000-01-01'),
    email: 'foo@example.com',
    username: 'foobar',
    uuid: '7a2d2178-37da-4f5c-bb05-5f6819ff6ecd',
    verified: true,
  };
  const expected = {
    date_of_birth: attrs.date_of_birth,
    email: attrs.email,
    email_domain: 'example.com',
    username: attrs.username,
    verified: attrs.verified,
  };
  const user = new User(attrs);
  expect(user.visible()).toStrictEqual(expected);

});

test('an Entity can expose all hidden attributes', () => {

  const attrs = {
    date_of_birth: new Date('2000-01-01'),
    email: 'foo@example.com',
    username: 'foobar',
    uuid: '7a2d2178-37da-4f5c-bb05-5f6819ff6ecd',
    verified: true,
  };
  const expected = {
    uuid: attrs.uuid,
  };
  const user = new User(attrs);
  expect(user.hidden()).toStrictEqual(expected);

});

test('an Entity can expose all visible attributes when cast to string', () => {

  const user = new User({
    date_of_birth: new Date('2000-01-01'),
    email: 'foo@example.com',
    username: 'foobar',
    uuid: '7a2d2178-37da-4f5c-bb05-5f6819ff6ecd',
    verified: true,
  });
  expect(String(user)).toStrictEqual(JSON.stringify(user.visible()));
  expect(JSON.stringify(user)).toStrictEqual(String(user));

});

test('an Entity can be constructed from JSON', () => {

  const json = JSON.stringify({
    date_of_birth: new Date('2000-01-01'),
    email: 'foo@example.com',
    username: 'foobar',
    uuid: '7a2d2178-37da-4f5c-bb05-5f6819ff6ecd',
    verified: true,
  });
  const user = new User(json);
  expect(user.date_of_birth).toBeInstanceOf(Date);
  expect(user.email).toStrictEqual('foo@example.com');
  expect(user.email_domain).toStrictEqual('example.com');
  expect(user.username).toStrictEqual('foobar');
  expect(user.uuid).toStrictEqual('7a2d2178-37da-4f5c-bb05-5f6819ff6ecd');
  expect(user.verified).toStrictEqual(true);

});

test('an Entity cannot be constructed from JSON containing values for unconfigured and function attributes', () => {

  expect(() => {
    const json = JSON.stringify({
      foo: 'bar',
    });
    new User(json);
  }).toThrow(UnconfiguredAttrError);

});
