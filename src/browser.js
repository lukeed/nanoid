var url = 'Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-';
var crypto = this.crypto || this.msCrypto;

export default function (size) {
  var id = '';
  size = size || 21;
  var bytes = crypto.getRandomValues(new Uint8Array(size));
  while (0 < size--) {
    id += url[bytes[size] & 63];
  }
  return id;
}
