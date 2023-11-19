import { registerAs } from '@nestjs/config';

//this function lets us register a namespaced configuration object under the "key" past as our first argument.
export default registerAs('coffee', () => ({
  foo: 'bar',
}));
