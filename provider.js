//déclaration de fonction pour chopper la liste avec les listId
class DeezerAPIHandler {
  constructor() {
    this.chartlistUrl = 'https://shazam.p.rapidapi.com/charts/list'
    this.options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8bd7bea49fmsh2b744dd0c4b202bp175bb5jsna5c214a753cd',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    }
  }

  async getChartList() {
    try {
      const response = await fetch(this.chartlistUrl, this.options);
      const result = await response.json();
      return result.countries;
    }
    catch (error) {
      console.error(error);
    }
  }

  // déclaration de fonction pour chopper le chart d'un pays en particulier
  async getCountryChart(listid, chartRange) {
    const url = `https://shazam.p.rapidapi.com/charts/track?locale=en-US&listId=${listid}&pageSize=${chartRange}&startFrom=0`;
    try {
      const response = await fetch(url, this.options);
      const result = await response.json();
      return result.tracks;
    } catch (error) {
      console.error(error);
    }
  }
}

export default DeezerAPIHandler
