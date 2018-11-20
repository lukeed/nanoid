import { randomFillSync } from 'crypto';

const buffers = {};
const url = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz';

function random(bytes) {
  let buffer = buffers[bytes];
  if (!buffer) {
    buffer = Buffer.allocUnsafe(bytes);
    if (bytes <= 255) buffers[bytes] = buffer;
  }
  return randomFillSync(buffer);
}

export default function (size) {
  let id = '';
  size = size || 21;
  let bytes = random(size);
  while (0 < size--) {
    id += url[bytes[size] & 63];
  }
  return id;
}
