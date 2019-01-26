import axios from 'axios';

const main = {
    axios: axios,
    axPromise: null,
    run: (run, method, params) => {
        let axPromise = null;
        let config = {
            crossdomain: true,
            // withCredentials: true,
            'X-Requested-With': 'XMLHttpRequest',
            // headers: {'Access-Control-Allow-Origin': '*'},
        };
        switch (method.toUpperCase()){
            case "GET":
                // if (params && Object.keys(params).length > 0) {
                //     // run = run + "?" + string.object2QueryStr(params);
                // }
                axPromise = axios.get(run, config);
                break;
            case "POST":
                axPromise = axios.post(run, params, config);
                break;
            case "PUT":
                axPromise = axios.put(run, params, config);
                break;
            case "PATCH":
                axPromise = axios.patch(run, params, config);
                break;
            case "DELETE":
                axPromise = axios.delete(run, config);
                break;
            default:
                console.log("ERROR: " + methodmethod);
                break;
        }
        main.axPromise = axPromise;
        return main;
    },

    success: callback => {
        main.axPromise.then( response => callback(response.data));
        return main;
    },

    error: callback => {
        main.axPromise.catch( (response) => {
            let returnData = null;
            try {
                returnData = JSON.parse(response.request.response);
            } catch (e) {
                main.writeErrorLog(response);
                returnData = {};
            }
            switch (response.request.status) {
                default:
                    callback(returnData, response.request.status);
                    break;
            }
        });
        return main;
    },
    writeErrorLog: error => {
        console.log(error);
    },
}

export default main;