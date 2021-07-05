import MersenneTwister from 'mersenne-twister'

const twister = new MersenneTwister(Math.random() * Number.MAX_SAFE_INTEGER)
const rnds8 = new Uint8Array(16)

function getRandomValues (abv) {
  let l = abv.length
  while (l--) {
    abv[l] = Math.floor(twister.random() * 256)
  }
  return abv
}

export function rng() {
  return getRandomValues(rnds8)
}
