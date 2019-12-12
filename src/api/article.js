// import Grammarbot from "grammarbot"
import fetch from "node-fetch";
import FormData from "form-data";
import testBody from "../lib/testBody";
import toxicity from "../lib/toxicity";

export default (article, responseCall) => {
  console.log(article);

  const perfectTenseApiUrl = "https://api.perfecttense.com/correct";
  const form = new FormData();
  form.append("text", `${article.text || "What is ur name?"}`);
  form.append("responseType", "grammarScore");

  console.log("toxicity", toxicity(article.text));

  fetch(perfectTenseApiUrl, {
    method: "POST",
    headers: { Authorization: "WNoOdif3f4cN3W0tuBBZgwtt" },
    body: form
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);

      return responseCall.json({ grammarScore: json.grammarScore });
    });

  // Grammar Bot API Test Failed as no index score as result
  // const bot = new Grammarbot({
  //   api_key: "KS9C5N3Y", // (Optional) defaults to node_default
  //   language: "en-US", // (Optional) defaults to en-US
  //   base_uri: "http://api.grammarbot.io", // (Optional) defaults to api.grammarbot.io
  //   text: "I can't remember how to go their"
  // });

  // // Callback style
  // bot.check("hello worldd", (error, result) => {
  //   if (!error) console.log(JSON.stringify(result));
  // });
};
