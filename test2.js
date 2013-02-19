var bigint = require('./');
bigint.setRandExp(128);
var rand = bigint.randB(128),
    tmpPrime,
    tmp = bigint(0);
  tmpPrime = rand.nextPrime();
  console.log(tmpPrime);
  tmp = tmpPrime.sub(3);
  console.log(tmp);