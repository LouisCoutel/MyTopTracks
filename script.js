
// on récupère le body du HTML dans le DOM
const body = document.body;



function loadSequence() {
  let loadOverlay = document.createElement('div')
  loadOverlay.id = 'load-overlay';
  loadOverlay.setAttribute('style', 'z-index: 3; background-color: #fefefa; width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; text-justify: center; text-align: center; font-size: 54px; font-weight: 400')
  body.appendChild(loadOverlay);

  function loadAnime() {
    anime({
      targets: loadOverlay,
      duration: 100000,
      loop: false,
      backdropFilter: ['blur(80px)', 'blur(0px)'],
      opacity: ['100%', '0%'],
      easing: 'linear',
      update: function (anim) {
        loadOverlay.innerHTML = '<p style="display: block; margin: auto">loading... <br>' + Math.round(anim.progress) + '%</p>';
      }
    })
  }

  loadAnime();
  loadAnime.finished.then(body.removeChild(loadOverlay))
}



// fonction d'animation lors du survol des éléments
function hover(svgPath) {
  // eslint-disable-next-line no-undef
  anime.remove(svgPath)

  // eslint-disable-next-line no-undef
  anime({   // éléments cibles
    targets: svgPath,
    // équivalent de "background-color" pour les SVG
    fill: ['#fefefa', '#FFE500'],

    // équivalent de "border"
    stroke: ['#fefefa', '#FFE500'],

    // durée de l'animation
    duration: 1000,

    // nombre d'itérations
    loop: false,

  })
}

function hoverReverse(svgPath) {
  // eslint-disable-next-line no-undef
  anime.remove(svgPath)

  // eslint-disable-next-line no-undef
  anime({   // éléments cibles
    targets: svgPath,
    // équivalent de "background-color" pour les SVG
    fill: ['#FFE500', '#fefefa'],

    // équivalent de "border"
    stroke: ['#FFE500', '#fefefa'],

    // durée de l'animation
    duration: 1000,

    // nombre d'itérations
    loop: false,

  })

}
function display(popupDiv) {
  // eslint-disable-next-line no-undef
  anime.remove(popupDiv)
  // eslint-disable-next-line no-undef
  anime({
    targets: popupDiv,
    opacity: ['0%', '100%'],
    translateY: -100,
    duration: 1000,
    loop: false,
  })
}

function displayReverse(popupDiv) {
  // eslint-disable-next-line no-undef
  anime.remove(popupDiv)
  // eslint-disable-next-line no-undef
  anime({
    targets: popupDiv,
    opacity: ['100%', '0%'],
    translateY: 100,
    duration: 1000,
    loop: false,
    easing: 'easeInQuad',

  })
  displayReverse.finished.then(body.removeChild(popupDiv))

}



//déclaration de fonction pour chopper la liste avec les listId
async function getChartList() {
  const url = 'https://shazam.p.rapidapi.com/charts/list';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7e40b53c7amsh62515ff28adca5fp199097jsn2c30ddb1adca',
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
      'X-RapidAPI-Key': '7e40b53c7amsh62515ff28adca5fp199097jsn2c30ddb1adca',
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



// --------------------------------------------------------------

// fonction qui sert juste à englober la séquence d'éxécution 
// chartList -> countryCharts -> ?
async function mainFunction() {
  let countries = await getChartList();

  // // // test avec un seul pays
  let tracks = await getCountryChart(countries[3].listid, 1);
  countries[3].title = tracks[0].title
  countries[3].artist = tracks[0].subtitle
  countries[3].images = tracks[0].images
  // // // fin du test

  // for await (let country of countries) {
  //   let tracks = await getCountryChart(country.listid, 1);
  //   country.title = tracks[0].title
  //   country.artist = tracks[0].subtitle
  //   country.images = tracks[0].images
  //   console.log("pays : " + country.id + ", chanson : " + country.title + ", artiste : " + country.artist + ", liste d'images : " + country.images)
  // }


  function setCountryElement(country) {
    // on crée la propriété HTMLelement qui fait le lien entre JS et le Document Object Model HTML
    country.HTMLelement = document.getElementById(country.id);
    country.HTMLelement.classList.toggle('land');
    country.HTMLelement.classList.toggle('pays-actifs');

    // cree un élement popup
    let popup = document.createElement("div");
    popup.classList.add('popup-div');

    let popupDivImg = document.createElement("div")
    popupDivImg.classList.add('popup-div-img');

    let popupDivText = document.createElement("div")
    popupDivText.classList.add('popup-div-text');

    let popupHeader = document.createElement('h3');
    popupHeader.classList.add('popup-header');

    let popupTitle = document.createElement('p');
    popupTitle.classList.add('popup-title');


    let popupArtist = document.createElement('p');
    popupArtist.classList.add('popup-artist');

    let popupImg = document.createElement('img')
    popupImg.classList.add('popup-img')




    // injection des données du tableau Countries
    popupHeader.innerHTML = '#<b>1</b> in ' + country.name;

    popupTitle.innerText = country.title;

    popupArtist.innerText = country.artist;

    if (country.images != undefined) {
      popupDivImg.setAttribute('style', `background-image: url(${country.images.coverart})`)
    } else {
      popupDivImg.setAttribute('style', `background-image: url(./Carte/retro-vinyl-record-icon-vector-illustration.jpg)`)
    }

    popup.appendChild(popupDivImg)
    popup.appendChild(popupDivText)
    popupDivImg.appendChild(popupImg);
    popupDivText.appendChild(popupHeader)
    popupDivText.appendChild(popupTitle)
    popupDivText.appendChild(popupArtist)
    country.popup = popup;
  }

  function assignEvents(country) {


    country.HTMLelement.onmouseenter = function () {
      country.position = country.HTMLelement.getBoundingClientRect()
      body.appendChild(country.popup)
      country.popup.setAttribute('style', `top: ${parseInt(country.position.y)}px;left: ${parseInt(country.position.x)}px`)
      hover(country.HTMLelement);
      display(country.popup)
    };

    // et l'inverse quand on quitte le pays pour revenir à l'état de base
    country.HTMLelement.onmouseleave = function () {
      hoverReverse(country.HTMLelement);
      displayReverse(country.popup)
    }
  }

  // countries.forEach(country => {
  //   setCountryElement(country)
  //   assignEvents(country)
  // });

  setCountryElement(countries[3])
  assignEvents(countries[3])
}
loadSequence();

// mainFunction();





