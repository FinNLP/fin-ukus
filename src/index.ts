import spellVar from 'spelling-variations';
import * as Fin from "finnlp";

declare module "finnlp" {
	export interface Run {
		tokenScores:()=>number[][];
		sentencesScores:()=>number[];
		inputScore:()=>number;
		toUS:()=>string;
		toUK:()=>string;
	}
}

// Token level scores
// 1: brit
// 0: neutral
// -1: american

Fin.Run.prototype.tokenScores = function(this:Fin.Run) {
	const scores:number[][] = [];
	this.sentences.forEach((sentence,si)=>{
		scores[si] = [];
		sentence.tokens.forEach((token,ti)=>{
			scores[si][ti] = 0;
			const analysis = new spellVar(token);
			if(analysis.scoreUK()>analysis.scoreUS()) scores[si][ti] += 1;
			if(analysis.scoreUK()<analysis.scoreUS()) scores[si][ti] -= 1;
		});
	});
	return scores;
};

Fin.Run.prototype.sentencesScores = function(this:Fin.Run) {
	return this.tokenScores().map(tokenBased=>tokenBased.reduce((a,b)=>a+b,0));
};

Fin.Run.prototype.inputScore = function(this:Fin.Run){
	return this.sentencesScores().reduce((a,b)=>a+b,0);
};

Fin.Run.prototype.toUS = function (this:Fin.Run) {
	let input = this.raw;
	this.tokenScores().forEach((sentence,si)=>{
		sentence.forEach((score,ti)=>{
			if(score>0) {
				const token = this.sentences[si].tokens[ti];
				const analysis = new spellVar(token);
				input = input.split(token).join(analysis.USPreferred());
			}
		});
	});
	return input;
};

Fin.Run.prototype.toUK = function (this:Fin.Run) {
	let input = this.raw;
	this.tokenScores().forEach((sentence,si)=>{
		sentence.forEach((score,ti)=>{
			if(score<0) {
				const token = this.sentences[si].tokens[ti];
				const analysis = new spellVar(token);
				input = input.split(token).join(analysis.UKPreferred());
			}
		});
	});
	return input;
};