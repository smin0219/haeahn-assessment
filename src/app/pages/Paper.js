import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import RadioButtonsGroup from '../components/RadioButton';
import Question from '../models/Question';
import styles from '../styles/Paper.module.css'
import { styled } from '@mui/material/styles';
import {Stack, TextField, Button, Input} from '@mui/material';
import {GetQuiz, GetStartQuiz} from '../data/Data';
import logoImg from '../images/logo.png';
import Timer from '../components/Timer'
import End from './End'

function Paper(props) {

    const baseURL = "https://bim.haeahn.com/certification";

    const navigate = useNavigate();
    const location = useLocation();

    const [employeeId, setEmployeeId] = React.useState(location.state.employeeId);
    const [isInit, setIsInit] = React.useState(true);
    const [isUpdated, setIsUpdated]= React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    const [solvedQuestions, setSolvedQuestions] = React.useState({});
    const [testInfo, setTestInfo] = React.useState({});


    const SubmitButton = styled(Button)`
        width: 180px;
        height: 50px;
        margin: 9px;
        border-radius: 10px;
        background-color: #E5E5E5;
        margin-top: 10px;
        color: black;
        font-size: 20px;
        &:hover,
        &:active {
            color: white;
            background-color: #2196f3;
        }
    `;

    const handleSubmitButtonClick = () => {
        navigate("/end/", {
            state: {
                employeeId: employeeId
            },
        });
    }

    React.useEffect(() => {
        if(isInit){
            GetQuiz().then((res) => {
                var questions = [];
                res.data.map((question) => {
                    questions.push(Question(question.seq, question.Media, question.content, question.Choices));
                    return questions;
                })
                setQuestions(questions);
                setIsInit(false);
                GetStartQuiz(employeeId).then((res) => {
                    setTestInfo(res.data[0]);
                })
            });
        }
    },[solvedQuestions.length, isInit, isUpdated, employeeId])

    return(
        <>
            <Stack direction='row' style={{position:'fixed', justifyContent:'center', color:'white', height: '70px', width:'100%', backgroundColor:'#004190', zIndex:'1'}}>
                {/* <img src={logoImg} style={{width: 'auto', height: '40px'}} alt="logo" /> */}
                <h2 style={{paddingRight:"5px"}}>남은 시간:</h2>
                <div style={{paddingLeft:'3px'}}></div>
                <Timer/>
                <h2 style={{padding: '0 100px 0 100px'}}>완료된 문제 수: {Object.keys(solvedQuestions).length} / {questions.length} </h2>
                <SubmitButton onClick={() => {handleSubmitButtonClick()}}>SUBMIT</SubmitButton>
            </Stack>
            <div style={{ width: 'auto', justifyContent:'center', paddingTop:'100px', backgroundColor:'#F5F5F5'}}>
                {questions.map((question, idx) => {
                    return(
                        <div key={idx} className={styles.paperContainer}>
                            <Stack direction='column' className={styles.questionContainer}>
                                <Stack direction='column' style={{padding:'30px 30px 50px 30px'}}>
                                    <Stack direction='row' style={{fontSize:'18px', paddingBottom:'20px'}}>
                                        {idx+1 + " "}.
                                        {question.content}
                                    </Stack>
                                    <RadioButtonsGroup 
                                        choices={question.choices} 
                                        solvedQuestions={solvedQuestions}
                                        setSolvedQuestions={setSolvedQuestions}
                                        isUpdated={isUpdated}
                                        setIsUpdated={setIsUpdated}
                                        questionInfo={question}
                                        testInfo={testInfo}
                                    >
                                    </RadioButtonsGroup>
                                </Stack>
                                <Stack direction='row' style={{width:'1450px', fontWeight: 'bold', justifyContent:'center'}}>
                                    {
                                        question.media.length > 0 ? 
                                            question.media.map((media, idx) => {
                                                return(
                                                    <img key={idx} src={baseURL+media.image} alt="building img" style={{paddingBottom:'50px'}}/>
                                                );
                                            }) 
                                        : <div></div>
                                    }
                                </Stack>
                                
                            </Stack>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default Paper