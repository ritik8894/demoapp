import axios from 'axios';

const apiCall = async (endpoint, method = 'GET',params=null, body = null,subdomain= "backend") => {
  const baseUrl = window.location.hostname; 

  const apiurl = `https://${subdomain}.${baseUrl}/api/${endpoint}`;


  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios({
      apiurl,
      method,
      headers,
      data: body, 
      params:params
    });

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default apiCall; 