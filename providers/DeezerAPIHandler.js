
//déclaration de fonction pour chopper la liste avec les listId
class DeezerAPIHandler {
  constructor() {
    this.options = {
      method: 'GET', headers: {
        'Accept': 'application/json',
        'Sec-Fetch-Dest': 'script',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-site'
      }
    }
  }

  async getTopTracks() {
    const url = `https://corsproxy.io/?https://api.deezer.com/user/547723/charts?limit=50`
    const res = await fetch(url, this.options);
    if (res.ok) {
      const data = await res.json()
      return data.data
    } else { throw new Error("error: ", res) }
  }

}

const deezerHandler = new DeezerAPIHandler()
export default deezerHandler

