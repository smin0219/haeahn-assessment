import * as React from "react";
import axios from "axios";
import fileDownload from "js-file-download";

export const UserLogin = (id, password) => {
    try{
        let formData = new FormData();
        formData.append("UserID", id);
        formData.append("PW", password);
        return axios.post("https://api.haeahn.com/api/loginsso", formData);
    }
    catch(error) {
        console.error(error);
    }
}

export const GetQuiz = () => {
    try{
        return axios.post("https://bimapi.haeahn.com/api/BIMQuiz/quiz");
    }
    catch(error) {
        console.error(error);
    }
}

export const DownloadFile = (url, filename) => {
    try{
        axios.get(url, {
            responseType: 'blob'
        }).then((res) => {
            fileDownload(res.data, filename);
        });
    }
    catch(error) {
        console.error(error);
    }
}