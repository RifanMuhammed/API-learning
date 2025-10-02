import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Supermen";
const yourPassword = "Superman#%$008";
const yourAPIKey = "7e665674-82e8-478c-b6ed-6aec84c3f27c";
const yourBearerToken = "8613d284-7011-4351-b9c5-f2882316357a";

app.get("/",  (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  try{
    const result=await axios.get("https://secrets-api.appbrewery.com/random");
    const randapi=result.data;
    res.render("index.ejs",{content:JSON.stringify(randapi)});

  }catch(error){
    res.status(404).send(error.message);
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async(req, res) => {
  try{
  const result=await axios.get("https://secrets-api.appbrewery.com/all",{
    auth:{
      username:"Supermen",
      password:"Superman#%$008",
    },
  });
  
  res.render("index.ejs",{content:JSON.stringify(result.data)});
}catch(error){
  res.status(404).send(error.message);
}}

  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
);

app.get("/apiKey",async (req, res) => {
  try{
    const result=await axios.get("https://secrets-api.appbrewery.com/filter",{
      params:{
        score:5,
        apiKey:yourAPIKey,
      },
    });
    const filterapi=result.data;
    res.render("index.ejs",{content:JSON.stringify(filterapi)});
  }catch(error){
    res.status(404).send(error.message);
  }
  //TODO 4: Write your code here to hit up the /filter endpoint  
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) =>{
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  try{
    const result=await axios.get("https://secrets-api.appbrewery.com/secrets/42",{
      headers:{ Authorization: `Bearer ${yourBearerToken}`},
    });
    const idapi=result.data;
    res.render("index.ejs",{content:JSON.stringify(idapi)});
  }catch(error){
    res.status(404).send(error.message);
  }

  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402

  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
