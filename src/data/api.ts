import axios from 'axios';
// const URL = 'https://api.jsonserve.com/0GB3Dg';
const URL = '../../api/api.json';

export const getData = async () => {
  try {
    const response = await axios.get(URL);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
