import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HoneyCombs from './helpers/honeyComb';

export const combs = new HoneyCombs({
    // apiUrl: process.env.REACT_APP_API_PATH,
    getResource: async(url, method, data, fileUpload = false, pointBase = 'https://swapi.dev/api') => {
        const opts = {
            method: `${method}`,
            mode: 'cors',
            headers: {
                Accept: 'application/json'
            },
            ...data
        };

        // const token = localStorage.getItem('token');
        // if (token) {
        //     opts.headers['X-Api-Token'] = token;
        // }

        if (!fileUpload) {
            opts.headers['Content-Type'] = 'application/json; charset=UTF-8';
        }
        console.log('{pointBase}{url}, opts', `${pointBase}${url}`, opts);
        let res = await fetch(`${pointBase}${url}`, opts);

        if (!res.ok) {
            const status = res.status;
            res = (await res.json());
            res.status = status;

            // Sentry.captureException(`Could not fetch ${pointBase}${url} received status: ${status}, message: ${res.message}`)

            throw new Error(`Could not fetch ${url} received ${res.status}`);
        }
        const body = await res.json();
        return body;
    }
});

ReactDOM.render(
  <React.StrictMode>
    <App combs={combs} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
