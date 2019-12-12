import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import article from "./article";

export default ({ config, db }) => {
  let api = Router();

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    res.json({ version });
  });

  // main code
  api.post("/article", (req, res) => {
    console.log(req.body);
    console.log(req.json);
    if (req.body && req.body.article) {
      return article(req.body.article, res);
    }
    res.json({ version });
  });

  // mount the facets resource
  api.use("/facets", facets({ config, db }));

  return api;
};
