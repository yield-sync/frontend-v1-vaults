// [IMPORT]
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'

// [IMPORT] Personal
import ABI_JustMallards from '../../abi/JustMallards'
import type { RootState } from '../../app/store';


// [WEB3]
const web3 = new Web3(window.ethereum)


// Just Mallards Contract
const justMallardsContract = new web3.eth.Contract(
	ABI_JustMallards as AbiItem[],
	'0x7F8162f4FfE3DB46CD3B0626daB699506C0FF63a'
)


const JustMallards = () => {
	// [REACT-REDUX][STATE]
	const walletAddress = useSelector((state: RootState) => state.App.walletAddress);
	const AppReducer = useSelector((state: RootState) => state.App);

	// [STATE-VARIABLES]
	const [justMallardsCount, set_justMallardsCount] = useState(0);

	useEffect(() => {
		// declare the data fetching function
		const fetchData = async () => {
			const jMC = await justMallardsContract.methods.balanceOf(
				walletAddress
			).call();

			set_justMallardsCount(jMC);
		}
		
		fetchData().catch(console.error);
	}, [AppReducer]);

	return (
		<div>
			<div className="row">
				<div className="col-12">
					<h4 className="text-light">Just Mallards</h4>
				</div>

				<h5>You Own {justMallardsCount} JMs</h5>
			</div>
		</div>
	);
};

export default JustMallards;