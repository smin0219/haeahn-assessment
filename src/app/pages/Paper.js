import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import RadioButtonsGroup from '../components/RadioButton';
import Question from '../models/Question';
import styles from '../styles/Paper.module.css'
import { styled } from '@mui/material/styles';
import {Stack, TextField, Button, Input} from '@mui/material';
import {GetQuiz, GetStartQuiz, GetEndQuiz, GetPreviousTest} from '../data/Data';
import logoImg from '../images/logo.png';
import Timer from '../components/Timer'
import End from './End'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Paper(props) {
    const baseURL = "https://bim.haeahn.com/certification";

    const navigate = useNavigate();
    const location = useLocation();

    const [isEnd, setIsEnd] = React.useState(false);
    const [isUpdated, setIsUpdated]= React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    const [solvedQuestions, setSolvedQuestions] = React.useState({});
    const [testInfo, setTestInfo] = React.useState(location.state.testInfo);
    const [givenTime, setGivenTime] = React.useState(90);
    const [open, setOpen] = React.useState(false);

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
        dialogOpen();
    }

    const handleConfirmButtonClick = () => {
        GetEndQuiz(testInfo.user_id, testInfo.seq);
        navigate("/end/", {
            state: {
                employeeId: testInfo.user_id
            },
        });
        dialogClose(false);
    }

    const handleCancelButtonClick = () => {
        dialogClose(false);
    }

    const dialogOpen = () => {
        setOpen(true);
    };

    const dialogClose = () => {
        setOpen(false);
    };

    const getTimer = () => {
        return (
            <Timer givenTime={givenTime} setIsEnd={setIsEnd}/>
        )
    }

    React.useEffect(() => {
        if(isEnd){
            navigate("/end/", {
                state: {
                    employeeId: testInfo.user_id
                },
            });
        } else{
            GetPreviousTest(testInfo.user_id).then((res) => {
                setGivenTime(res.data[0].given_time);
                if(res.data.length > 0){
                    GetQuiz(testInfo.seq).then((res) => {
                        var questions = [];
                        res.data.map((question, idx) => {
                            let alreadySolved = (question.Choices.filter((choice) => choice.selected === true))
                            if(alreadySolved.length > 0){
                                let questions = solvedQuestions;
                                questions[idx+1] = alreadySolved[0].content;
                                setSolvedQuestions(solvedQuestions);
                            }
                            
                            questions.push(Question(question.seq, question.Media, question.content, question.Choices));
                            return questions;
                        })
                        setQuestions(questions);
                    });
                }
                else{
                    navigate("/");
                }
            })
        }
    },[solvedQuestions.length, isUpdated, testInfo.seq, isEnd, givenTime])

    return(
        <>
            <Stack direction='row' style={{position:'fixed', justifyContent:'center', color:'white', height: '70px', width:'100%', backgroundColor:'#004190', zIndex:'1'}}>
                {/* <img src={logoImg} style={{width: 'auto', height: '40px'}} alt="logo" /> */}
                <h2 style={{paddingRight:"5px"}}>남은 시간:</h2>
                <div style={{paddingLeft:'3px'}}></div>
                {getTimer()}
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
                                        {idx+1 + ". "}
                                        {question.content}
                                    </Stack>
                                    <RadioButtonsGroup 
                                        solvedQuestions={solvedQuestions}
                                        setSolvedQuestions={setSolvedQuestions}
                                        isUpdated={isUpdated}
                                        setIsUpdated={setIsUpdated}
                                        questionInfo={question}
                                        questionNumber={idx+1}
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
            <Dialog
                open={open}
                onClose={dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"제출 하시겠습니까?"}
                </DialogTitle>
                <DialogContent>
                    {"완료된 문제 수: " + Object.keys(solvedQuestions).length + '/' + questions.length}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {handleConfirmButtonClick()}} autoFocus>
                        제출
                    </Button>
                    <Button onClick={() => {handleCancelButtonClick()}}>
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default Paper