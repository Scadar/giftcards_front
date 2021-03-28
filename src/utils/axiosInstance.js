import axios from "axios";

let headers = {}
headers["Content-type"] = "application/json"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    responseType: "json",
    headers
})

axiosInstance.interceptors.request.use(
    config => {
        if (localStorage.token) {
            config.headers["Authorization"] = "Bearer_" + localStorage.token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve) => {
            resolve(response)
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
        if (error.response.status === 401) {
            console.log("error.response.status === 401")
        } else {
            return new Promise(((resolve, reject) => {
                reject(error)
            }))
        }
    })

export default axiosInstance
