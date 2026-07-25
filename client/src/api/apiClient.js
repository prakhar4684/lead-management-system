import axios from "axios";


const apiclient = axios.create({

    baseURL: `${import.meta.env.VITE_API_URL}/api`,

    headers: {
        "Content-Type": "application/json"
    }

});




// Request interceptor

apiclient.interceptors.request.use((config) => {
  console.log("Request Data:", config.data);
  console.log("Type:", typeof config.data);

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});





// Response interceptor


apiclient.interceptors.response.use(


    (response)=>{


        return response;


    },


    (error)=>{


        if(
            error.response &&
            error.response.status === 401
        ){


            localStorage.removeItem("token");


            // later redirect login

        }


        return Promise.reject(error);


    }

);




export default apiclient