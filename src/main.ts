import {Debugger} from "inspector";

const ethers = require("ethers");
import * as artifacts from "./Strainz.json";

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    const blocks = await provider.getBlockNumber();
    console.log(blocks);

    const strainzcontract = new ethers.Contract("0x59516426a8BB328d2F546B05421CBc047042e38f", artifacts.abi, provider);
    const filter = strainzcontract.filters.Minted(null);
    const count = blocks - 5334392;

    const results = [];
    for (let i = 5334392; i <= 5400000; i += 4900) {
        results.push(... await strainzcontract.queryFilter(filter, i, i + 4900));
        console.log(i);
    }
    const transactions = [];
    for(let result of results)
    {
        try {
            transactions.push(await result.getTransactionReceipt())
        }
        catch{

        }
    }
    /*
    const transactions = await Promise.all(results.map(async result=>{
        return await result.getTransactionReceipt();
    }));
     */
    debugger;
}

main();
