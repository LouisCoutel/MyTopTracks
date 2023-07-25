
// // fonction d'animation lors du survol des éléments
// const hoverAnim = function (country, color1, color2) {
//   // on enlève les précédentes targets 
//   // pour éviter un comportement bizarre de répétition de l'animation
//   anime.remove(country);
//   // animejs + paramètres
//   anime({
//     // éléments cibles
//     targets: `#${country.id}`,
//     // équivalent de "background-color" pour les SVG
//     fill: [color1, color2],
//     // équivalent de "border"
//     stroke: [color1, color2],
//     // durée de l'animation
//     duration: 1000,
//   })
// }

// // fonction pour tous les pays
// countries.forEach(country => {
//   // on crée la propriété element qui fait le lien entre JS et le Document Object Model HTML
//   country.element = document.getElementById(country.id);
//   // lorsqu'on rentre dans la zone du pays avec le curseur
//   country.element.onmouseenter = function () {
//     // animation de blanc cassé à rouge
//     hoverAnim(country, '#fefefa', '#ffe500').play;
//   };
//   // et l'inverse quand on quitte le pays pour revenir à l'état de base
//   country.element.onmouseleave = function () {
//     console.log('exit')
//     hoverAnim(country, '#ffe500', '#fefefa').play;
//   }
// })

// déclaration de fonction pour chopper la liste avec les listId
async function getChartList() {
  const url = 'https://shazam.p.rapidapi.com/charts/list';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8bd7bea49fmsh2b744dd0c4b202bp175bb5jsna5c214a753cd',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.countries;
  }
  catch (error) {
    console.error(error);
  }
}

// déclaration de fonction pour chopper le chart d'un pays en particulier
async function getCountryChart(listid, chartRange) {
  const url = `https://shazam.p.rapidapi.com/charts/track?locale=en-US&listId=${listid}&pageSize=${chartRange}&startFrom=0`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8bd7bea49fmsh2b744dd0c4b202bp175bb5jsna5c214a753cd',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.tracks;
  } catch (error) {
    console.error(error);
  }
}


// fonction qui sert juste à englober la séquence d'éxécution 
// chartList -> countryCharts -> ?
async function mainFunction() {
  let countries = await getChartList();

  // test avec un seul pays
  let tracks = await getCountryChart(countries[0].listid, 1);
  console.log(tracks.title)
    countries[0].title = tracks[0].title
    countries[0].artist = tracks[0].subtitle
    countries[0].images = tracks[0].images

  console.log(countries[0]);
  // fin du test

  // countries.forEach(country => {
  //   let tracks = await getCountryChart(country.listid, 1);
  //   country.title = tracks.title
  //   country.artist = tracks.subtitle
  //   country.images = tracks.images
  // })
  // console.log(await getCountryChart(countries[0].listid, 1))
}

mainFunction();





