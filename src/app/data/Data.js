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

export const GetPreviousTest = (user_id) => {
    try{
        return axios.post(baseURL + 'previous-test', null, {
            params: {
                user_id
            },
        });
    }
    catch(error) {
        console.error(error);
    }
}

export const GetQuiz = (test_id) => {
    try{
        return axios.post(baseURL + 'quiz', null, {
            params: {
                test_id,
            },
        });
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
};

export const SetQuizChoices = (choices, quiz_id) => {
    try{
        let choiceList = [];
        Object.keys(choices).forEach((key) => {
            choices[key].quiz_id = quiz_id;
            choiceList.push(choices[key]);
        });

        return axios.post(baseURL + 'set-quiz-choices', JSON.stringify(choiceList), {
            headers: {
              'Content-Type': `application/json`,
            },
        });
    } catch (error) {
        console.error(error);
    }
}


export const SetQuizMedia = (files, quiz_id) => {
    debugger;
    try{
        let formData = new FormData();
        files.forEach(item => {
            formData.append('files', item);
        })
        formData.append('quiz_id', quiz_id);
        return axios.post(baseURL + 'set-quiz-media',formData);
    } catch (error) {
        console.error(error);
    }
}

export const DelQuiz = (quiz_id) => {
try {
    return axios.post(baseURL + 'del-quiz', null, {
    params: {
        quiz_id,
    },
    });
} catch (error) {
    console.log(error);
}
};

export const StartNewQuiz = (user_id) => {
    try{
        return axios.post(baseURL + 'start-new-quiz', null, {
            params: {
                user_id,
            },
          });
    } catch (error) {
        console.log(error);
    }
}

export const StartContinueQuiz = (user_id, previous_id) => {
    try{
        return axios.post(baseURL + 'start-continue-quiz', null, {
            params: {
                user_id,
                previous_id
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
        fileDownload(url, filename, "x-zip-compressed");
    }
    catch(error) {
        console.error(error);
    }
}

export const GetEndQuiz = (user_id, test_id) => {
    try{
        return axios.post(baseURL + 'end-quiz', null, {
            params: {
                user_id,
                test_id
            },
          });
    } catch (error) {
        console.log(error);
    }
}