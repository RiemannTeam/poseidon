# Poseidon
[https://www.poseidon-hash.info](https://www.poseidon-hash.info)

## Important
Please enable solidity compilers optimize
```js
{
  compilers: [
    {
      version: "0.8.16",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "istanbul",
      },
    },
  ],
  overrides: {
    "contracts/helper/PoseidonT3.sol": {
      version: "0.8.16",
      settings: {
        optimizer: {
          enabled: true,
          runs: 9999,
        },
        evmVersion: "istanbul",
      },
    },
    "contracts/helper/PoseidonT4.sol": {
      version: "0.8.16",
      settings: {
        optimizer: {
          enabled: true,
          runs: 9999,
        },
        evmVersion: "istanbul",
      },
    },
  },
}
```

## Address
### PoseidonT3
- **Ethereum** [0x3189C962470c2C3763D639305B21BcFeb1D26e19](https://etherscan.io/address/0x3189C962470c2C3763D639305B21BcFeb1D26e19)
- **Polygon** [0x3189C962470c2C3763D639305B21BcFeb1D26e19](https://polygonscan.com/address/0x3189C962470c2C3763D639305B21BcFeb1D26e19)
- **BSC** [0x3189C962470c2C3763D639305B21BcFeb1D26e19](https://bscscan.com/address/0x3189C962470c2C3763D639305B21BcFeb1D26e19)
- **Optimism** [0x3189C962470c2C3763D639305B21BcFeb1D26e19](https://optimistic.etherscan.io/address/0x3189C962470c2C3763D639305B21BcFeb1D26e19)
- **Arbitrum** [0x3189C962470c2C3763D639305B21BcFeb1D26e19](https://arbiscan.io/address/0x3189C962470c2C3763D639305B21BcFeb1D26e19)

## Reference
[circomlibjs](https://github.com/iden3/circomlibjs)
- [poseidon_opt.js](https://github.com/iden3/circomlibjs/blob/main/src/poseidon_opt.js)
- [poseidon_gencontract.js](https://github.com/iden3/circomlibjs/blob/main/src/poseidon_gencontract.js)

## LICENSE
The [MIT License](LICENSE).