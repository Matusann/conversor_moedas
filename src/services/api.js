import axios from 'axios';

// Rota para buscar all/BTC-BRL

export const api = axios.create({
    baseURL: "https://economia.awesomeapi.com.br/json/"
})