import * as React from "react";
import axios from "axios";
import fileDownload from "js-file-download";

let baseURL = "http://localhost:5059/api/BIMQuiz/";
// let baseURL = "https://bimapi.haeahn.com/api/BIMQuiz/"

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

export const SetQuiz = (quizModel) => {
    try {
        let formData = new FormData();
        Object.keys(quizModel).forEach(function (key) {
          formData.append(key, quizModel[key]);
        });
        return axios.post(baseURL + 'set-quiz', formData);
    } catch (error) {
     console.error(error);
    }
}

export const GetStartQuiz = (user_id) => {
    try{
        return axios.post(baseURL + 'start-quiz', null, {
            params: {
                user_id,
            },
          });
    } catch (error) {
        console.log(error);
    }
}

export const SetChoose = (user_id, test_id, quiz_id, choose_id) => {
    try{
        return axios.post(baseURL + 'choose-quiz', null, {
            params: {
                user_id,
                test_id,
                quiz_id,
                choose_id
            },
          });
    } catch (error) {
        console.log(error);
    }
}

export const DownloadFile = (url, filename) => {
    try{
        fileDownload(url, filename);
    }
    catch(error) {
        console.error(error);
    }
}