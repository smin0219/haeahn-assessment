import * as React from "react";
import { useNavigate } from 'react-router-dom';
import {Stack, TextField, Button, Input} from '@mui/material';
import { styled } from '@mui/material/styles';
import {UserLogin} from '../data/Data'
import Preparation from "./Preparation";

const loginContainerStyle = {
    minWidth: '700px',
    minHeight: '700px',
    top: '15%',
    left: '35%',
    borderRadius: '10px',
    position: 'absolute',
    float: 'center',
    opacity: 0.95,
    backgroundColor: 'white',
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

function Login() {
    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [failureMessage, setFailureMessage] = React.useState("");

    const navigate = useNavigate();

    const handleStartButtonClick = (id, password) => {
        if(id === '' || password === ''){
            setFailureMessage("사용자 이름 또는 암호가 올바르지 않습니다.");
        } else{
            UserLogin(id, password).then((res) => {
                if(res.data.resultCode === -1){
                    setFailureMessage("사용자 이름 또는 암호가 올바르지 않습니다.");
                }
                else{
                    navigate("/preparation/", {
                        state: {
                            id: id
                        },
                    });
                }
            });
        }
    }

    React.useEffect(()=>{
        console.log(failureMessage);
    },[failureMessage]);

    return (
        <div style={loginContainerStyle}>
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
                            onBlur={(e) => setId(e.target.value)}
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
                        onBlur={(e) => setPassword(e.target.value)}
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
    );
}
export default Login;

