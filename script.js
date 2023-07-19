
const axios = require("axios");

const options = {
  method: "GET",
  url: "https://shazam.p.rapidapi.com/charts/list",
  headers: {
    "X-RapidAPI-Key": "bb7644f4camsh704f7d5613a7768p12b59bjsn15758ea5893b",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

async function test() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

test();