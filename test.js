var bigint = require('./'),
    srand = require('srand');
// all these by center
bigint.setRandExp(128);
var rand = bigint.randB(128),
    tmpPrime,
    tmp = bigint(0);
while (1) {                          /* repeat until prime is of form 4r+3 */
  tmpPrime = rand.nextPrime();
  tmp = tmpPrime.sub(3);
  if ( tmp.divisible(4) ) { break; }
  rand = tmpPrime;
}
var P = bigint(tmpPrime);
rand = bigint.randB(128);
while (1) {                          /* repeat until prime is of form 4r+3 */
  tmpPrime = rand.nextPrime();
  tmp = tmpPrime.sub(3);
  if ( tmp.divisible(4) ) { break; }
  rand = tmpPrime;
}
var Q = bigint(tmpPrime);
var n = bigint(P.mul(Q));
console.log(n);
// computer some keys(by prover, public key given to verifier)
var candidate, inverse, i = [], s = [], flag;
var K = 5, index = 0;

while ( index < K ) {
  candidate = n.rand();
  for (index2 = index-1; index2 >= 0; index2-- ) {
    if ( s[index2].cmp(candidate) === 0 ) {
      flag = TRUE;
      break;
    }
  }
  if ( flag ) { continue; }
  inverse = candidate.mul(candidate).mod(n);
  if ( bigint.invert(inverse, inverse, n) === 0 ) {
    continue;
  }

  s[index] = candidate;
  i[index] = inverse;
  index++;
}

console.log("Public key:", i);
console.log("Private key:", s);
//witness(by prover, send witness and )
var witness, random = bigint(n).rand();
witness = random.mul(random);
witness = witness.mod(n);
console.log("witness", witness);

//chanllenge this is the challenge passed(verifier)
var challenge = 0x0;
srand.seed(Date.now());
for ( index = 0; index < K; index++ ) {
  bit = srand.rand() % 2;
  if ( bit ) {
    challenge |= (0x1 << index);
  }
}
console.log("challenge: ", challenge);

//respond with the prove(this is for the prover, prover proves he has private key)
//and using the chanllenge's bits calculate the prove
var prove = bigint(random);
for ( index = 0; index < K; index++ ) {
  if ( challenge & (0x1 << index)) {
    prove = prove.mul(s[index]);
  }
}
prove = prove.mod(n);
console.log("prove:", prove);

//verify (this is verifier, contains witness, and using the public key)
var test = prove.mul(prove);
for ( index = 0; index < K; index++ ) {
  if ( challenge & (0x1 << index)) {
    test = test.mul(i[index]);
  }
}
test = test.mod(n);
if ( witness.cmp(test) === 0 ) {
  console.log("matched!");
} else {
  console.log("failed");
}

// prover calculates public key and private key
// prover calculates witness and random
// prover sends public key and witness
// verifier sends challenge
// prover calculates prove with challenge
// prover sends prove
// verifier test with witness

// basically prover needs to have the private key, and n
// the verifier needs to have the public key and n