import axios from "axios";
import {SetPosts} from "../redux/postSlice"

const API_URL = "http://localhost:3000";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
});

export const apiRequest = async ({ url, token, data, method}) => {

try{
    const result = await API.request({
        url: url,
        method: method || "GET",
        data: data,
        headers: {
            "Content-Type":"application/json",
            Authorization : token ? `Bearer ${token}` : "",
        },
    });
    
    return result?.data;
}catch (error){
    const err = error.response.data;
    console.log(err);
    return {status: err.success, message:err.message};
}
};

export const handleFileUpload = async (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset","TWITTER CLONE");

    try{
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID }/image/upload/`,
            formData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
        );
        return response.data.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;  // or handle the error in a way that suits your application
    }
};

export const fetchPosts = async (token, dispatch, uri, data) => {
    try{
        const res = await apiRequest({
            url: uri || "/posts",
            token: token,
            method: "POST",
            data: data || {},
        });
        if (res && res.data) {
            dispatch(SetPosts(res.data));
        }
        return;
    }catch(error){
        console.log("Cloudinary fetch Error:", error);
        return null;
    }
};

export const likePost = async ({ uri , token }) => {
  try{
    const res = await apiRequest({
        url: uri,
        token: token,
        method: "POST",
    });
    return res ;
  }catch(error){
    console.error("Cloudinary like Post Error:", error);
    return null;
  }
};


export const deletePost = async (id, token) => {
    try{
        const res = await apiRequest({
            url:"/posts/" + id,
            token :token,
            method : "DELETE",
        });
        return res;
    }catch(error){
        console.error("Cloudinary delete Post Error:", error);
        return null;
    }
};

export const getUserInfo = async (token, id) => { 
    try{
        const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;

        const res = await apiRequest({
            url: uri,
            token:token,
            method: "POST",
        });
        if (res?.message === "Authentication failed"){
            localStorage.removeItem("user");
            window.alert("User session expired. Login again.");
            window.location.replace("/login");
        }
        return res?.user;
    }catch(error){
        console.error("Cloudinary Get User Info Error:", error);
        return null;
    }
};

export const sendFriendRequest = async (token, id) => {
    try{
         const res = await apiRequest({
            url:"/users/friend-request",
            token: token,
            method: "POST",
            data: { requestTo: id},
         });
         return;
    }catch(error){
        console.error("Cloudinary send Friend Request Error:", error);
        return null;
    }
};

export const viewUserProfile = async (token, id) => {
    try{
         const res = await apiRequest({
            url:"/users/profile-view",
            token: token,
            method: "POST",
            data: { id},
         });
         return;
    }catch(error){
        console.error("Cloudinary view user Request Error:", error);
        return null;
    }
};

// export const deleteFriend = async (id, token) => {
//     try{
//         const res = await apiRequest({
//             url: `/users/delete/${user?._id}`,
//             token :token,
//             method : "DELETE",
//         });
//         return res;
//     }catch(error){
//         console.error(" friend Post Error:", error);
//         return null;
//     }
// };