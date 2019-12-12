import * as toxicity from "@tensorflow-models/toxicity";
import testBody from "./testBody";

export default article => {
  console.log("toxicity test running");

  // The minimum prediction confidence.
  const threshold = 0.9;

  // Load the model. Users optionally pass in a threshold and an array of
  // labels to include.

  toxicity.load(threshold).then(model => {
    const sentences = ["can you open my toy please"];

    console.log("sentences");

    model.classify(testBody).then(predictions => {
      // `predictions` is an array of objects, one for each prediction head,
      // that contains the raw probabilities for each input along with the
      // final prediction in `match` (either `true` or `false`).
      // If neither prediction exceeds the threshold, `match` is `null`.
      console.log(JSON.stringify(predictions));
      console.log(predictions[6].results[0].match);

      return predictions[6].results[0].match;

      /*
    prints:
    {
      "label": "identity_attack",
      "results": [{
        "probabilities": [0.9659664034843445, 0.03403361141681671],
        "match": false
      }]
    },
    {
      "label": "insult",
      "results": [{
        "probabilities": [0.08124706149101257, 0.9187529683113098],
        "match": true
      }]
    },
    ...
     */
    });
  });
};