import axios from 'axios'

// export const BASE_URL = 'http://localhost:3000/api/v1'
export const BASE_URL = 'https://api.kitob-faxr.uz:4000/api/v1'
export const BASE_URL_PH = 'https://api.kitob-faxr.uz:4000'
// export const BASE_URL_PH = 'http://localhost:3000'
// export const BASE_URL = "http://159.203.142.41:3000/api/v1"
// export const BASE_URL = "https://api.drkodirov.uz/api/v1"

const config = {
	headers: {
		'Content-Type': 'multipart/form-data',
		// 'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
}

export const APP_API = {
	upload: `${BASE_URL_PH}/uploads`,
	login: `${BASE_URL}/auth/login`,
	getMe: `${BASE_URL}/auth/get-me`,
	register: `${BASE_URL}/auth/register`,
	sales: `${BASE_URL}/sales`,
	news: `${BASE_URL}/news`,
	subNews: `${BASE_URL}/subNews`,
	projects: `${BASE_URL}/projects`,
	archetecturas: `${BASE_URL}/archetecturas`,
	allData: `${BASE_URL}/all-data`,
	orderArchetectura: `${BASE_URL}/order`,
}

export const BASE_CONFIG = {
	doGet: api => axios.get(api),
	doPost: (api, data) => axios.post(api, data, config),
	getMe: id => axios.get(`${APP_API.getMe}/${id}`, config),
	doReq: (api, data) => axios.post(api, data),
	doPut: (api, data) => axios.put(api, data, config),
	doDelete: api => axios.delete(api, config),
	doLogin: (api, data) => axios.post(api, data),
	doRegister: (api, data) => axios.post(api, data),
}
