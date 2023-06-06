import config from "./poseidon_config.js"

const NROUNDSF = 8

const NROUNDSP = [56, 57, 56, 60, 60, 63, 64, 63, 60, 66, 60, 65, 70, 60, 64, 68]

const Q = 21888242871839275222246405745257275088548364400416034343698204186575808495617n
const ZERO = 0n
const ONE = 1n

// z = (x + y) mod q
const add = (x, y) => (x + y) % Q

// z = (x * y) mod q
const mul = (x, y) => (x * y) % Q

// z = (x * x) mod q
const square = x => (x * x) % Q

// const exp5 = n => exp(n, 5)
const exp5 = x => mul(square(square(x)), x)

const exp5state = state => {
  for(let i = 0; i < state.length; i++) {
    state[i] = exp5(state[i])
  }
}

const ark = (state, cc, it) => {
  for(let i = 0; i < state.length; i++) {
    state[i] = add(state[i], cc[it + i])
  }
}

const mix = (state, t, mm) => {
  let newState = Array.from({ length: t }).map(() => ZERO)
  
  for(let i = 0; i < state.length; i++) {
    for(let j = 0; j < state.length; j++) {
      newState[i] = add(newState[i], mul(mm[j][i], state[j]))
    }
  }

  return newState
}

const poseidon = inputs => {
  let length = inputs.length
  if(length === 0 || length > NROUNDSP.length) {
    throw new Error(`invalid inputs length ${length}, max ${NROUNDSP.length}`)
  }

  let bigInputs = inputs.map(input => BigInt(input))
  if(bigInputs.findIndex(n => n > Q) >= 0) {
    throw new Error("inputs values not inside Finite Field")
  }

  let t = length + 1
  
  let nRoundsF = NROUNDSF
  let nRoundsP = NROUNDSP[t - 2]
  let C = config.C[t - 2]
  let S = config.S[t - 2]
  let M = config.M[t - 2]
  let P = config.P[t - 2]

  let state = [ZERO, ...bigInputs]
  ark(state, C, 0)

  for(let i = 0; i < nRoundsF / 2 - 1; i++) {
    exp5state(state)
    ark(state, C, (i + 1) * t)
    state = mix(state, t, M)
  }

  exp5state(state)
  ark(state, C, (nRoundsF / 2) * t)
  state = mix(state, t, P)

  for(let i = 0; i < nRoundsP; i++) {
    state[0] = exp5(state[0])
    state[0] = add(state[0], C[(nRoundsF / 2 + 1) * t + i])

    let newState0 = ZERO
    for(let j = 0; j < state.length; j++) {
      newState0 = add(newState0, mul(S[(t * 2 - 1) * i + j], state[j]))
    }

    for(let k = 1; k < t; k++) {
      state[k] = add(state[k], mul(state[0], S[(t * 2 - 1) * i + t + k - 1]))
    }
    state[0] = newState0
  }

  for(let i = 0; i < nRoundsF / 2 - 1; i++) {
    exp5state(state)
    ark(state, C, (nRoundsF / 2 + 1) * t + nRoundsP + i * t)
    state = mix(state, t, M)
  }
  exp5state(state)
  state = mix(state, t, M)

  return state[0]
}

export default poseidon