const test = require('tape');
const nanoid = require('../dist/nanoid');

const ALPHABET = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz';

test('generates URL-friendly IDs', t => {
  for (var i = 0; i < 100; i++) {
    let id = nanoid();
    if (typeof id !== 'string') throw new Error(`was not string: "${id}"`);
    if (id.length !== 21) throw new Error(`was not 21 chars: "${id}"`);
    for (var j = 0; j < id.length; j++) {
    	if (!ALPHABET.includes(id[j])) {
    		throw new Error(`ALPHABET does not contain: "${id[j]}"`);
    	}
    }
  }
  t.pass('~> all were valid 21-char strings');
  t.end();
});

test('changes ID length', t => {
	t.is(nanoid(10).length, 10);
	t.end();
});

test('has no collisions', t => {
  let i=0, used={};
  for (; i < 100e3; i++) {
    let id = nanoid();
    if (used[id] !== void 0) {
    	throw new Error('An ID was repeated!');
    }
    used[id] = true;
  }
  t.pass('~> no repeats in 100k cycles');
  t.end();
});

test('has flat distribution', t => {
  let COUNT = 100e3;
  let LENGTH = nanoid().length;

  let i=0, j=0, chars={};
  for (; i < COUNT; i++) {
    let id = nanoid();
    for (j=0; j < id.length; j++) {
      let char = id[j];
      if (!chars[char]) {
      	chars[char] = 0;
      }
      chars[char] += 1;
    }
  }

  t.is(Object.keys(chars).length, ALPHABET.length);

  let max = 0;
  let min = Number.MAX_SAFE_INTEGER;

  for (let k in chars) {
    let distribution = (chars[k] * ALPHABET.length) / (COUNT * LENGTH);
    if (distribution > max) max = distribution;
    if (distribution < min) min = distribution;
  }

  t.true((max - min) <= 0.05);
  t.end();
});
