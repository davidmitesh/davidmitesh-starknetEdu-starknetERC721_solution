const starknet = require("hardhat").starknet;

/**
 * @dev This function deploy a StarkNet account and logs the address and private key for later use
 * This make take up to 10 minutes to run. See https://stats.goerli.net/ for block times
 */
async function deployLogAccount() {
  // const starknetAccount = await starknet.deployAccount("OpenZeppelin");
  // console.log(`ADDRESS=${starknetAccount.address}`);
  // console.log(`PKEY=${starknetAccount.privateKey}`);
  // return;
  const starknetAccount = await starknet.getAccountFromAddress("0x0344eA2e3FD35431fff40151e6ae95002A9E62B3F559B8e769e4C865d47d1d1D", "0x041FB4E148DBF5C20015E132DF25E7F93B60383FA94A8357B31127AF30CCBC11", "Argent");
  console.log(`ADDRESS=${starknetAccount.address}`);
  console.log(`PKEY=${starknetAccount.privateKey}`);
  const name = starknet.shortStringToBigInt("MITESHTOKEN");
  const symbol = starknet.shortStringToBigInt("MT");
  const to_ = BigInt('0x4be820949abaa49aed57dda04149958475a56004dc49a7f076f1d32d88495c7')
  const nftFactory = await starknet.getContractFactory("ERC721");
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
