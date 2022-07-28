const starknet = require("hardhat").starknet;
// const account = require("hardhat").

require("dotenv").config();
/**
 * @dev This function deploy a StarkNet account and logs the address and private key for later use
 * This make take up to 10 minutes to run. See https://stats.goerli.net/ for block times
 */
async function deployLogAccount() {

    const name = starknet.shortStringToBigInt("MITESHATTRIBUTETOKEN");
    const symbol = starknet.shortStringToBigInt("MAT");
    //here we are setting the to_ address to the evaluator contract address.
    const to_ = BigInt('0x2004d22f8e1ee0ee93c27cfb377e09341ea3cc4231987c24e89442fa27e4a6c')

    const nftFactory = await starknet.getContractFactory(
        "Ex_02"
    );


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
    .catch((err) => console.log(err)); 
