// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

export default async (ALCHEMY_API_KEY: string, address: string) =>
{
	try
	{
		const alchemy = new Alchemy({
			apiKey: ALCHEMY_API_KEY,
			network: Network.ETH_MAINNET,
		});

		return await alchemy.core.getTokenBalances(address);
	}
	catch (e)
	{
		return e;
	}
};
