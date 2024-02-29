import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseurl";

//register user
export const registerAPI = async (user) => {
    return await commonAPI("post", `${BASE_URL}/user/register`, user, "")
}

//login user
export const loginAPI = async (reqbody) => {
    return await commonAPI("post", `${BASE_URL}/user/login`, reqbody, "")
}

//ad project
export const addProjectAPI = async (reqbody, reqHeader) => {
    return await commonAPI('post', `${BASE_URL}/project/add`, reqbody, reqHeader)
}

//get home project
export const homeProjectAPI = async () => {
    return await commonAPI('get', `${BASE_URL}/project/home-project`, '', '')
}

//get all projects
//search key passed as query parameter
//path?key=value
export const getAllProjectsAPI = async (searchkey, reqHeader) => {
    return await commonAPI('get', `${BASE_URL}/project/all-project?search=${searchkey}`, '', reqHeader)
}

//get user project
export const getUserProjectAPI = async (reqHeader) => {
    return await commonAPI('get', `${BASE_URL}/project/user-project`, '', reqHeader)
}

//update user project
export const editUserProjectAPI = async (id, reqbody, reqHeader) => {
    return await commonAPI('put', `${BASE_URL}/project/edit/${id}`, reqbody, reqHeader)
}

//delete project
export const deleteProjectAPI = async (id, reqHeader) => {
    return await commonAPI("delete", `${BASE_URL}/project/remove/${id}`, {}, reqHeader)
}