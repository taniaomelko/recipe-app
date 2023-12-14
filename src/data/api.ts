import axios from 'axios';
const URL = process.env.PUBLIC_URL + '/api/api.json';

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
