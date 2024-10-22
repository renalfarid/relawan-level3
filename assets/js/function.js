const apiUrl = 'https://formlv3.inimibarru.com/api/'
let dataRelawan = {}
let formDataRelawan = {}
let updatePemilih = null
let idKelurahan = 0

var apiRequest = function() {

    async function get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
         const url = `${apiUrl}${endpoint}?${queryString}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data
        } catch (error) {
            console.error("Error in API call:", error);
            return false;
        }
    }

    async function post(endpoint, body = {}) {
        const url = `${apiUrl}${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error in API call (POST):", error);
            return false;
        }
    }

    return {
        apiGet: get,
        apiPost: post
    }
}();