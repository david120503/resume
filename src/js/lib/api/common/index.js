import baseApi from '../baseApi';

const main = {
    ...baseApi,

    sendMail: params => {
        let api_url = "sendMail.php";
        if (location.host.indexOf("localhost") == -1) {
            api_url = "https://api.pressplay.one/" + api_url;
        }

        return main.run(api_url, "POST", params);
    }
};

export default main;