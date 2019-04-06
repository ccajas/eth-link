
        // Minimalist ABI for smart contract
        let minABI = [
            // balanceOf
            {
              "constant":true,
              "inputs":[{"name":"_owner","type":"address"}],
              "name":"balanceOf",
              "outputs":[{"name":"balance","type":"uint256"}],
              "type":"function"
            },
            // decimals
            {
              "constant":true,
              "inputs":[],
              "name":"decimals",
              "outputs":[{"name":"","type":"uint8"}],
              "type":"function"
            }
        ];
        this.myContract = this.$web3.eth.Contract(minABI);

            // instantiate by address
            //console.log(this.myContract.balanceOf);
            /*this.MyContract.balanceOf(tx.to, function(error, success)
            {
                if(error) console.log ("Something went wrong: " + error);
                else console.log ("Balance: " + success.toString(10));
            });*/