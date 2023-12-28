
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

  async search(query) {
    const url = `https://corsproxy.io/?https://api.deezer.com/search?q=${query}`
    const res = await fetch(url, this.options);
    if (res.ok) {
      const data = await res.json()
      return data.data
    } else { throw new Error("error: ", res) }
  }

}

const deezerHandler = new DeezerAPIHandler()
export default deezerHandler

