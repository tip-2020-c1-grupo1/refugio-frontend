import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/preference_id?amount=';

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