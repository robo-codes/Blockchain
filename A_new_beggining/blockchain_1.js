const SHA256 = require('crypto-js/sha256')

class block{
    constructor(index, timestamp, data, previous_hash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previous_hash = previous_hash;
        this.hash = this.calculate_hash();
    }

    calculate_hash(){
        return SHA256(this.index + this.timestamp + this.previous_hash + JSON.stringify(this.data)).toString();
    }

}

class blockchain{
    constructor(){
        this.chain = [this.genesis_block()];
    }

    genesis_block(){
        return new block(0, '11/01/1999', "Not confused !", "0");
    }

    get_latest_block(){
        return this.chain[this.chain.length-1];
    }

    add_block(newblock){
        newblock.previous_hash = this.get_latest_block().hash;
        newblock.hash = newblock.calculate_hash();
        this.chain.push(newblock);
    }
}

let me = new blockchain();
me.add_block(new block(1, "06/03/2000", { confused : 1 }));
me.add_block(new block(2, "10/08/1994", { idontknow : 1 }));

console.log(JSON.stringify(me, null, 4))