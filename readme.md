# Fin-UKUS

Detecting and converting a sentence between the english and british spelling variations.

## Installation

```
npm i --save fin-ukus
```

## Usage

```typescript
import * as Fin from "finnlp";
import "fin-ukus";

const sentence = "eon. theatre advertiser.";

const instance = new Fin.Run(sentence);

instance.inputScore(); // 1
instance.sentencesScore(); // [-1,2]
instance.tokensScore(); // [[-1],[1,1]]
instance.toUS(); // "eon. theater advertizer"
instance.toUK(); // "aeon. theatre advertiser"

```

## About the scores

- The token scores:
    - `-1` An american spelling variation.
    - `1` A british spelling variation.
    - `0` A neutral spelling.
- The sentences scores are the sum of the token scores.
- The input score is the sum of the sentences scores.