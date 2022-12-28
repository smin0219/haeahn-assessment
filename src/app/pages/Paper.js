import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import RadioButtonsGroup from '../components/RadioButton';
import Question from '../models/Question';
import styles from '../styles/Paper.module.css'
import { styled } from '@mui/material/styles';
import {Stack, TextField, Button, Input} from '@mui/material';
import {UserLogin, GetQuiz} from '../data/Data';
import logoImg from '../images/logo.png';
import Timer from '../components/Timer'
import End from './End'

function Paper(props) {

    const navigate = useNavigate();

    const [isInit, setIsInit] = React.useState(true);
    const [questions, setQuestions] = React.useState([]);
    const [solvedQuestionCount, setSolvedQuestionCount] = React.useState(0);

    const InfoStyle = {
        position:'fixed', 
        top: '30%', 
        left: '65%'
    }

    const SubmitButton = styled(Button)`
        
        width: 100%;
        height: 60px;
        border-radius: 30px;
        background-color: lightgrey;
        color: black;
        font-size: 20px;
        margin-left: 5px;
        margin-top: 80px;
        &:hover,
        &:active {
            color: white;
            background-color: #2196f3;
        }
    `;

    const handleSubmitButtonClick = () => {
        navigate("/end/", {
            state: {
                id: props.id
            },
        });
    }

    React.useEffect(() => {
        if(isInit){
            GetQuiz().then((res) => {
                var questions = [];
                res.data.map((question) => {
                    questions.push(Question(question.seq, question.Media, question.content, question.Choices));
                })
                setQuestions(questions);
                setIsInit(false);
            });
        }

    },[solvedQuestionCount])

    return(
        <div style={{backgroundColor:'#F5F5F5', paddingBottom:'50px'}}>
            <div style={InfoStyle}>
                <img src={logoImg} className={styles.logoImg} style={{paddingLeft:"60px", paddingBottom:"60px"}} alt="logo" />
                <Stack direction='column'>
                    <Stack direction='row'>
                        <h2 style={{paddingRight:"5px"}}>남은 시간:</h2>
                        <Timer/>
                    </Stack>
                    <Stack direction='row'> 
                        <h2>완료된 문제 수: {solvedQuestionCount} / {questions.length} </h2>
                    </Stack>
                </Stack>
                <SubmitButton onClick={() => {handleSubmitButtonClick()}}>SUBMIT</SubmitButton>
            </div>
            {questions.map((question, idx) => {
                return(
                    <div key={idx} className={styles.paperContainer}>
                        <Stack direction='column' className={styles.questionContainer}>
                            <h1>Question {idx+1}</h1>
                            {
                                question.media.length > 0 ? 
                                    question.media.map((image, idx) => {
                                        return(
                                            <img key={idx} src={require("../question_images/bimtestimg1.png")} alt="building img" style={{paddingBottom:'20px'}}/>
                                        );
                                    }) 
                                : <div style={{paddingBottom:'20px'}}></div>
                            }
                            {question.content}
                            <RadioButtonsGroup choices={question.choices} solvedQuestionCount={solvedQuestionCount} setSolvedQuestionCount={setSolvedQuestionCount}></RadioButtonsGroup>
                        </Stack>
                    </div>
                );
            })}
        </div>
    );
}
export default Paper