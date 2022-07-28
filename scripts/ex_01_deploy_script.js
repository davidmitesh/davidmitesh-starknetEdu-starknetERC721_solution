const starknet = require("hardhat").starknet;

/**
 * @dev This function deploy a StarkNet account and logs the address and private key for later use
 * This make take up to 10 minutes to run. See https://stats.goerli.net/ for block times
 */
async function deployLogAccount() {

  const name = starknet.shortStringToBigInt("MITESHTOKEN");
  const symbol = starknet.shortStringToBigInt("MT");
  //here to_ refers to the evlauator address
  const to_ = BigInt('0x4be820949abaa49aed57dda04149958475a56004dc49a7f076f1d32d88495c7')
  // const nftFactory = await starknet.getContractFactory("ERC721");

  const nftFactory = await starknet.getContractFactory("ERC721")
  // nftFactory.de
  const nftContract = await nftFactory.deploy({
    name,
    symbol,
    to_
  });
  console.log(`Deployed NFT Contract to address ${nftContract.address}`);
  // console.log(`Granting minting permissions to ${myAccount.address}...`);
}

deployLogAccount()
  .then(() => process.exit(0))
  .catch((err) => console.log(err)); ``
