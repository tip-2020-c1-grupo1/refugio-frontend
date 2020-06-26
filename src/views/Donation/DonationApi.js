import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_HOST + '/api/preference_id?amount=';

function getPreference(amount) {
  const url = baseUrl + amount;
  try{
    const response = axios.get(url)
    return response;
  }
  catch (error) {
    console.error(error);
  }
}

export {getPreference};