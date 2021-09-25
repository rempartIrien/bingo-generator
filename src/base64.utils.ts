import { Base64 } from 'js-base64';

export function encode(str: string): string {
  return Base64.encodeURI(str);
}

export function decode(str: string): string {
  return Base64.decode(str);
}
