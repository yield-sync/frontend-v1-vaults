// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

export default async (ALCHEMY_API_KEY: string, chainId: number, address: string) =>
{
	let network = Network.ETH_MAINNET;

	try
	{
		switch (chainId) 
		{
		case 1:
			network = Network.ETH_MAINNET;
			break;

		case 5:
			network = Network.ETH_GOERLI;
			break;

		case 10:
			network = Network.OPT_MAINNET;
			break;

		default:
			return;
			break;
		}

		const alchemy = new Alchemy({
			apiKey: ALCHEMY_API_KEY,
			network: network,
		});

		return await alchemy.core.getTokenBalances(address);
	}
	catch (e)
	{
		return e;
	}
};
