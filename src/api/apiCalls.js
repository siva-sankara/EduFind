// src/utility/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import endPoints from './endpoints';

// Base URL Configuration
const api = axios.create({
  baseURL: 'http://10.0.2.2:8080', 
  // baseURL: 'http://lochalhost:8080', // Change this to your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to Add Token to Headers
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Error Handling Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Login API
export const LoginAPI = async (data) => {
  try {
    const response = await api.post(endPoints.login, {
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Signup API
export const SignUpAPI = async (data) => {
  console.log(data, "===")
  try {
    const response = await api.post(endPoints.register, {
      name: data?.name,
      email: data?.email,
      password: data?.password
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//get user detaiols by using userId API
export const getUserDetails = async(userId)=>{
  try {
    const response = await api.get(`${endPoints.UserDetails}/${userId}`)
    return response;
  } catch (error) {
    console.log("error while getting user details api " , error?.message)
  }
}

// UPDATE PROFILE API
export const UpdateBasicProfileDetails = async (userId , data) => {
  try {
    const response = await api.patch(`${endPoints.updateBasicInfo}/${userId}`, 
      {
        firstName: data?.firstName,
        lastName: data?.lastName,
        currentDesignation: data?.currentDesignation,
        phoneNumber: data?.phoneNumber,
        email: data?.email,
        dateOfBirth : "1-12-2003"
      }
    );
    return response;
  } catch (error) {
    console.log("went something wrong")
    throw error;
  }
};

// UPDATE PROFILE API
export const UpdateSocialMediaDetails = async (userId , data) => {
  try {
    const response = await api.patch(`${endPoints.updateSocailmediaLinks}/${userId}`, 
      {
        facebook: data?.facebook ,
        instagram: data?.instagram,
        github: data?.github,
        linkedin: data?.linkedin,
        twitter: data?.twitter,
        otherLinks: [data?.otherLinks]
      }
    );
    return response;
  } catch (error) {
    console.log("went something wrong")
    throw error;
  }
};

//upload a user query
export const uploadAUserQuery=  async(queryData)=>{
try {
const response = await api.post( endPoints.uploadAUserQuery, queryData);
  return response;
} catch (error) {
  console.error('Failed to upload user query:', error);
  return null;
}
}

//get all questions
export const getAllQuestions=  async()=>{
  try {
  const response = await api.get( endPoints.getAllQuestions);
    return response;
  } catch (error) {
    console.error('Failed to upload user query:', error);
    return null;
  }
  }

//get Career step Detsilas 
export const getCareerStepDetails = async ()=>{
  try {
    const responce = await api.get(endPoints.getCareerDetials)
    return responce;
  } catch (error) {
    return error?.message;
  }
}


//post answer  to a question
export const postAnswerToAQuestion =async(questionId ,newAnswerObj )=>{
  try {
    const response = await api.patch(`${endPoints.postAnswerToQuestion}/${questionId}`, newAnswerObj );
    return response;
  } catch (error) {
    return error.message;
  }
}

//upvote a question
export const upVoteAQuestion = async(questionId, payload)=>{
  try {
    const response = await api.post(`${endPoints.upVoteAQuestion}/${questionId}`, payload);
    return response;
  } catch (error) {
    return error?.message;
  }
}

//upvote a question
export const downVoteAQuestion = async(questionId, payload)=>{
  try {
    const response = await api.post(`${endPoints.downVoteAQuestion}/${questionId}`, payload);
    return response;
  } catch (error) {
    return error?.message;
  }
}
//media
export const uploadProfilePicture = async (userId, formData) => {
  try {
    const response = await axios.post(`http://10.0.2.2:8080/user/media/upload-profile-picture/${userId}`, formData , {headers: {
      'Content-Type': 'multipart/form-data',
    }});
    console.log(response,"------")
    return response.data;
  } catch (error) {
    console.error('Failed to upload profile picture:', error);
    return null;
  }
};


export const addUserVideo = async (userId, videoUrl, title, description) => {
  try {
    const response = await axios.post(endPoints.postVideo, {
      userId,
      videoUrl,
      title,
      description,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add video:', error);
    return null;
  }
};


export const addPostedImage = async (userId, imageUrl, caption) => {
  try {
    const response = await axios.post(endPoints.postImage, {
      userId,
      imageUrl,
      caption,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add posted image:', error);
    return null;
  }
};

export default api;
