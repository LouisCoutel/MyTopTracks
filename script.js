//Importer le module axios servant a gerer les requetes 
define(function (require) {
  var axios = require("axios");
});


// const divNL = document.getElementById('divNL')

// //Creation de la fonction asynchrone pour que JS attende la réponse de la requete avant de continuer
// async function test() {
//   try {
//     const response = await axios.request(options);
//     //le .data transforme la reponse en objet Json
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }




// //Structure de la requete
// const options = {
//   method: "GET",
//   //URL du Point d 'acces "End point"
//   url: "https://shazam.p.rapidapi.com/charts/list",
//   headers: {
//     "X-RapidAPI-Key": "bb7644f4camsh704f7d5613a7768p12b59bjsn15758ea5893b",
//     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
//   },
// };


async function getChart() {
  const optionsChart = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/charts/track',
    params: {
      locale: 'en-US',
      listId: 'ip-country-chart-NL',
      pageSize: '20',
      startFrom: '0'
    },
    headers: {
      'X-RapidAPI-Key': '8bd7bea49fmsh2b744dd0c4b202bp175bb5jsna5c214a753cd',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(optionsChart);
    console.log(response.data)
    const tracksChart = response.data.tracks
    const n1infos = { pos: "<b>#1</b> Top Netherlands", title: tracksChart.title, artist: tracksChart.subtitle }
    return n1infos
  } catch (error) {
    console.error(error);
  }
}


console.log(getChart());




// divNL.innerHTML = "<p>" + number1infos.pos + "</p>" + "<p>" + number1infos.title + "</p>" + "<p>" + number1infos.artist + "</p>"
