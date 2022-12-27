import * as React from 'react'
import RadioButtonsGroup from '../components/RadioButton';
import Question from '../models/Question';
import styles from '../styles/Paper.module.css'
import {Stack, TextField, Button, Input} from '@mui/material';
import Data from '../data/Data';
import image from '../question_images/bimtestimg1.png';

function Paper() {

    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        var choices = [1,2,3,4]
        var qs = [
            Question(1,"https://sample-url.com",image, "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),
            Question(2,"https://sample-url.com","", "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),
            Question(3,"https://sample-url.com",image, "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),
            Question(4,"https://sample-url.com",image, "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),
            Question(5,"https://sample-url.com",image, "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),
            Question(6,"https://sample-url.com",image, "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),
            Question(7,"https://sample-url.com",image, "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),
            Question(8,"https://sample-url.com",image, "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),
            Question(9,"https://sample-url.com",image, "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),
            Question(10,"https://sample-url.com",image, "문제: 1ST FFL 평면도에서 이미지 속 선택된 창호에 대하여 Tag by Category 기능으로 도어 태그를 배치하였을 때, 도어 태그에 어떤 숫자가 표시됩니까?",choices),

        ]
        setQuestions(qs);
    },[])

    return(
        <div style={{backgroundColor:'#F5F5F5'}}>
            {questions.map((question, idx) => {
                return(
                    <div key={idx} className={styles.paperContainer}>
                        <Stack direction='column' className={styles.questionContainer}>
                            <h1>Question {idx+1}</h1>
                            {
                                question.image !== "" ? <img src={require("../question_images/bimtestimg1.png")} alt="building img" style={{paddingBottom:'20px'}}/> :
                                <div style={{paddingBottom:'20px'}}></div>
                            }
                            {question.contents}
                            <RadioButtonsGroup></RadioButtonsGroup>
                        </Stack>
                    </div>
                );
            })}
        </div>
    );
}
export default Paper