import axios from 'axios'

const url = 'http://localhost:3000/api'

const $axios = axios.create({
    baseURL: url,
    headers: {
        'Content-type': 'application/json'
    }
})

export default $axios