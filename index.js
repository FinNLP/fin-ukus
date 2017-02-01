const spellVar = require('spelling-variations');
module.exports = {
	id:"UKUS",
	extension:function(){
		this.result.forEach((sentence,si)=>{
			this.result[si].sentenceUS = 0;
			this.result[si].sentenceUK = 0;
			this.result[si].tokenUKUS = [];
			sentence.tokens.forEach((token,ti)=>{
				var ukTokenScore = new spellVar(token).scoreUK();
				var usTokenScore = new spellVar(token).scoreUS();
				if(ukTokenScore>0) this.result[si].sentenceUK = this.result[si].sentenceUK + ukTokenScore;
				if(usTokenScore>0) this.result[si].sentenceUS = this.result[si].sentenceUS + usTokenScore;
				if(ukTokenScore>usTokenScore) this.result[si].tokenUKUS[ti] = "UK";
				else if(ukTokenScore<usTokenScore) this.result[si].tokenUKUS[ti] = "US";
				else this.result[si].tokenUKUS[ti] = "NEUTRAL";
			});
		});
		return this.result.map(sentence=>{
			return {
				UK:sentence.sentenceUK,
				US:sentence.sentenceUS
			};
		});
	}
};