//Importer le module axios servant a gerer les requetes 
const axios = require("axios");

//Structure de la requete
const options = {
  method: "GET",
  //URL du Point d 'acces "End point"
  url: "https://shazam.p.rapidapi.com/charts/list",
  headers: {
    "X-RapidAPI-Key": "bb7644f4camsh704f7d5613a7768p12b59bjsn15758ea5893b",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
//Creation de la fonction asynchrone pour que JS attende la réponse de la requete avant de continuer
async function test() {
  try {
    const response = await axios.request(options);
    //le .data transforme la reponse en objet Json
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

test();

