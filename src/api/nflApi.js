import axios from 'axios';

//Customized axios request call nflApi.get(..) instead of using headers and key for every request
const nflApi = axios.create({
    baseURL: "https://nfl-api-data.p.rapidapi.com",
    headers: {
        "x-rapidapi-host": "nfl-api-data.p.rapidapi.com",
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        },
});

export default nflApi;