const SHA256 = require('crypto-js/sha256')

class transaction{
    constructor(from_address, to_address, amount){
        this.from_address = from_address;
        this.to_address = to_address;
        this.amount = amount;
    }
}

class block{
    constructor(timestamp, transactions, previous_hash=''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previous_hash = previous_hash;
        this.hash = this.calculate_hash();
        this.nonce = 0
    }

    calculate_hash(){
        return SHA256(this.timestamp + this.previous_hash + JSON.stringify(this.data) + this.nonce).toString();
    }

    mine_block(difficulty){
        while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculate_hash();
        }

        console.log('block mined : ' + this.hash)
    }

}

class blockchain{
    constructor(){
        this.chain = [this.genesis_block()];
        this.difficulty = 4;
        this.pending_transaction = [];
        this.mining_reward = 69;
    }

    genesis_block(){
        return new block('11/01/1999', "Not confused !", "0");
    }

    get_latest_block(){
        return this.chain[this.chain.length-1];
    }

    /*add_block(newblock){
        newblock.previous_hash = this.get_latest_block().hash;
        newblock.mine_block(this.difficulty);
        this.chain.push(newblock);
    }*/

    mine_pending_transactions(mining_reward_address){
        let Block = new block(Date.now(), this.pending_transaction);
        Block.mine_block(this.difficulty);

        console.log("Block has been mined!");
        this.chain.push(Block);

        this.pending_transaction=[
            new transaction(null, mining_reward_address, this.mining_reward)
        ];
    }

    create_transaction(transaction){
        this.pending_transaction.push(transaction);
    }

    get_balance(address){
        let balance = 0;

        for(const Block of this.chain){
            for(const trans of Block.transactions){
                if(trans.from_address === address){
                    balance -= trans.amount;
                }

                if(trans.to_address === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    is_chain_valid(){
        for(let i = 1; i < this.chain.length; i++){
            const currunt_block = this.chain[i];
            const previous_block = this.chain[i-1];

            if(currunt_block.hash != currunt_block.calculate_hash()){
                return false;
            }

            if(currunt_block.previous_hash != previous_block.hash){
                return false;
            }
        }
        return true;
    }
}

let XDcoin = new blockchain();
XDcoin.create_transaction(new transaction(101, 102, 55));
XDcoin.create_transaction(new transaction(102, 101, 25));

console.log("\n starting mining!.....");
XDcoin.mine_pending_transactions(1111);

console.log("balance for 1111 is : ", XDcoin.get_balance(1111));

console.log("\n starting mining again!.....");
XDcoin.mine_pending_transactions(1111);
console.log("balance for 1111 is : ", XDcoin.get_balance(1111));



//console.log(me, null, 4)
