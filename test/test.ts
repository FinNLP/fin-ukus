/// <reference path="../node_modules/@types/node/index.d.ts" />

import * as Fin from "finnlp";
import "../src/index";


function fail (msg:string){
	console.error(`\t ❌ Fail: ${msg}`);
	process.exit(1);
}

function pass (msg:string) {
	console.log(`\t ✔ Passed: ${msg}`);
}

function assert(condition:boolean,message:string){
	if(condition) pass(message);
	else fail(message);
}

let uk = "aesthetically pleasing views are good for our theatre";
let us = new Fin.Run(uk).toUS();
assert(uk !== us, "transform UK to US");
uk = new Fin.Run(us).toUK();
assert(us !== uk, "transform US to UK");
assert(new Fin.Run(uk).inputScore() === 2,"UK score");
assert(new Fin.Run(us).inputScore() === -2,"US score");