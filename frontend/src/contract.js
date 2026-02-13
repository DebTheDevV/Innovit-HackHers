export const contractAddress = "0x930E237f2E1F2b8B3b29263dBceB2882e0413AD9"; 

export const abi = [
  {
    "inputs":[{"internalType":"string","name":"_batchId","type":"string"}],
    "name":"registerBatch",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"string","name":"_batchId","type":"string"}],
    "name":"getBatch",
    "outputs":[
      {"internalType":"string","name":"id","type":"string"},
      {"internalType":"address","name":"farmer","type":"address"},
      {"internalType":"uint8","name":"stage","type":"uint8"}
    ],
    "stateMutability":"view",
    "type":"function"
  }
];