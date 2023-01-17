import * as React from "react";
import { useNavigate } from 'react-router-dom';
import {Stack, TextField, Button, Input} from '@mui/material';
import { styled } from '@mui/material/styles';
import {GetPreviousTest, UserLogin, StartNewQuiz, StartContinueQuiz} from '../data/Data'
import Preparation from "./Preparation";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Result from './Result';

const loginContainer = {
    display: 'flex', 
    width:'100%', 
    height:'100%', 
    justifyContent: 'center', 
    alignItems:'center', 
    position:'relative'
}

const loginStyle = {
    minWidth: '700px',
    minHeight: '700px',
    borderRadius: '10px',
    opacity: 0.95,
    backgroundColor: 'white',
    position: 'absolute'
};

const LoginTextField = styled(Input)`
    width: 300px;
`;

const PasswordTextField = styled(Input)`
    width: 430px;
    type: 'password';
`;

const StartButton = styled(Button)`
    width: 100%;
    height: 60px;
    border-radius: 30px;
    background-color: lightgrey;
    color: black;
    font-size: 20px;
    &:hover,
    &:active {
        color: white;
        background-color: #2196f3;
    }
`;

const NewButton = styled(Button)`
    width: 500px;
    height: 60px;
    border-radius: 10px;
    background-color: lightgrey;
    color: black;
    font-size: 20px;
    &:hover,
    &:active {
        color: white;
        background-color: #2196f3;
    }
`;

function Login() {
    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [failureMessage, setFailureMessage] = React.useState("");
    const [openContinueDialog, setOpenContinueDialog] = React.useState(false);
    const [openNewDialog, setOpenNewDialog] = React.useState(false);
    const [previousId, setPreviousId] = React.useState("");
    const [userInfo, setUserInfo] = React.useState({});

    const navigate = useNavigate();

    const dialogNewOpen = () => {
        setOpenNewDialog(true);
    };
    
    const dialogNewClose = () => {
        setOpenNewDialog(false);
    };

    const dialogContinueOpen = () => {
        setOpenContinueDialog(true);
    };
    
    const dialogContinueClose = () => {
        setOpenContinueDialog(false);
    };

    const handleStartButtonClick = (id, password) => {
        if(id === '' || password === '') {
            setFailureMessage("사용자 이름 또는 암호가 올바르지 않습니다.");
        } else if( id === 'admin' && password === 'admin123!@#'){
            navigate("/admin/");
        } else{
            if(id==='sj.min' || id==='dh.lee2' || id==='jaehkim' || id==='yj.lee'){
                UserLogin(id, password).then((res) => {
                    if(res.data.resultCode === -1){
                        setFailureMessage("사용자 이름 또는 암호가 올바르지 않습니다.");
                    }
                    else{
                        setUserInfo(res.data);
                        sessionStorage.setItem("employeeId", res.data.resultMessage);
                        GetPreviousTest(res.data.resultMessage).then((res) => {
                            if(res.data.length > 0){
                                setPreviousId(res.data[0].seq);
                                dialogContinueOpen();
                            }
                            else{
                                dialogNewOpen();
                            }
                        });
                    }
                });  
            }else{
                setFailureMessage('평가 기간이 아닙니다');
            }
        }
    }

    const handleNewQuizClick = () => {
        navigate("/preparation/", {
            state: {
                employeeId: sessionStorage.getItem("employeeId")
            }
        });
    }

    const handleResultClick = () => {
        debugger;
        navigate("/result/", {
            state: {
                id: id,
                userInfo: userInfo
            }
        });
    }

    const handleContinueQuizClick = ()=>{
        let employeeId = sessionStorage.getItem("employeeId");
        StartContinueQuiz(employeeId, previousId).then((res) => {
            debugger;
            navigate("/paper/", {
                state: {
                    testInfo: res.data[0]
                },
            });
        })
    }

    React.useEffect(()=>{
        console.log(failureMessage);
    },[failureMessage]);

    return (
        <div style={loginContainer}>
            <div style={loginStyle}>
                <Stack direction="column">
                    <Stack direction="row">
                        <h1 style={{paddingTop:'80px', paddingLeft: '80px'}}>Haeahn BIM Assessment Test</h1>
                        <h5 style={{paddingTop:'100px', paddingLeft: '30px'}}>version v1.0</h5>
                    </Stack>
                    <Stack direction="column" style={{paddingTop:'60px', paddingLeft: '120px'}}>
                        <h3>Email:</h3>
                        <Stack direction="row">
                            <LoginTextField
                                sx={{
                                    '.MuiInputBase-input': { fontSize: '1.25rem' },
                                }}
                                inputProps={{
                                    autoComplete: "off",
                                    placeholder:"HUB ID"
                                }}
                                onChange={(e) => setId(e.target.value)}
                            >
                            </LoginTextField >
                            <span style={{fontSize:"20px", paddingTop:"5px", paddingLeft:"5px"}}>@haeahn.com</span>
                        </Stack>
                        
                        <h3 style={{paddingTop:'15px'}}>Password:</h3>
                        <PasswordTextField
                            sx={{
                                '.MuiInputBase-input': { fontSize: '1.25rem' },
                            }}
                            inputProps={{
                                type:"password",
                                autoComplete: "off",
                                placeholder:"HUB Password"
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </PasswordTextField>
                        <div style={{color:"red", textAlign:"center", width: "430px", height: "15px", paddingTop:"40px"}}>{failureMessage}</div>
                        <div style={{textAlign:"center", width: "430px", paddingTop: "50px"}}>
                            <StartButton onClick={() => {handleStartButtonClick(id, password)}}>
                                로그인
                            </StartButton>
                        </div>
                    </Stack>
                </Stack>
            </div>
            <Dialog
                open={openNewDialog}
                onClose={dialogNewClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Stack direction='row'>
                        <NewButton onClick={() => {handleNewQuizClick()}}  style={{marginRight:'50px'}} autoFocus>
                            새 평가 시작
                        </NewButton>
                        <NewButton onClick={() => {handleResultClick()}} autoFocus>
                            평가 결과 조회
                        </NewButton>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openContinueDialog}
                onClose={dialogContinueClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"알림"}
            </DialogTitle>
            <DialogContent>
                {"진행 중이던 테스트가 있습니다. 이어서 하시려면 아래의 버튼을 눌러주세요."}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {handleContinueQuizClick()}} autoFocus>
                    이어서 시작하기
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}
export default Login;

