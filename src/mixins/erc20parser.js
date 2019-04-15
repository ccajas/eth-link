
export default {
	data: function()
    {
        return {
			erc20_abi_min: [
                "function name() view returns (string)",
                "function decimals() view returns (uint8)",
                "function balanceOf (address _owner) view returns (uint256 balance)",
                "function symbol() view returns (string)"
            ]
		}
    },
    methods: {
        async parseERC20(tx)
        {
            tx.data = tx.data.substring(2);
            tx.tokenTo = '0x' + tx.data.substring(32, 72);
            console.log('token transfer');

            let contract = new this.$ethers.Contract(tx.to, this.erc20_abi_min, this.$provider);

            tx.tokenName = await contract.name();//.then(function(name) 
            tx.tokenSymbol = await contract.symbol();
            let decimals = await contract.decimals();
            
            // Convert token amount
            console.log('token from: '+ tx.from +' token to: '+ tx.tokenTo);
            tx.tokenAmount = tx.data.substring(72, 136);
            tx.tokenAmount = this.$ethers.utils.bigNumberify('0x'+ tx.tokenAmount) / (10 ** decimals);
            console.log(tx.tokenAmount +' '+ tx.tokenName +'('+ tx.tokenSymbol +') from contract '+ tx.to);
                                                 
            //.catch((err) => { console.error(err) } );     
        }
    }
}