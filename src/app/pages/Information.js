import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {Stack, TextField, Button, Input} from '@mui/material';
import { styled } from '@mui/material/styles';
import {DownloadFile} from '../data/Data'
import fileDownload from 'js-file-download';
import {GetPreviousTest, UserLogin, StartNewQuiz, StartContinueQuiz} from '../data/Data'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const informationContainerStyle = {
    display: 'flex', 
    width:'100%', 
    height:'100%', 
    justifyContent: 'center', 
    alignItems:'center', 
    position:'relative'
};

const informationStyle = {
    minWidth: '1000px',
    minHeight: '810px',
    borderRadius: '10px',
    position: 'absolute',
    opacity: 0.95,
    backgroundColor: 'white'
};

const StyledButton = styled(Button)`
    width: 60%;
    height: 50px;
    border-radius: 5px;
    background-color: lightgrey;
    color: black;
    font-size: 20px;
    &:hover,
    &:active {
        color: white;
        background-color: #2196f3;
    }
`;

function Information(props) {
    const [warning, setWarning] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();
    const handleDowloadButtonClick = () => {
        var url = "https://bim.haeahn.com/certification/files/BIM평가모델-2023신입.zip";
        window.location.href=url;
    }

    const handleStartButtonClick = () => {
        GetPreviousTest(props.employeeId).then((res) => {
            debugger;
            if(res.data.length > 0){
                sessionStorage.setItem("previousId", res.data[0].seq);
                dialogOpen();
            }
            else{
                StartNewQuiz(props.employeeId).then((res) => {
                    sessionStorage.setItem("previousId", res.data[0].seq);
                    navigate("/paper/", {
                        state: {
                            testInfo: res.data[0]
                        },
                    });
                })
            }
        })
    }

    const dialogOpen = () => {
        setOpen(true);
    };

    const dialogClose = () => {
        setOpen(false);
    };

    const handleContinueQuizClick = ()=>{
        debugger;
        let previousId = sessionStorage.getItem("previousId");
        StartContinueQuiz(sessionStorage.getItem("employeeId"), previousId).then((res) => {
            sessionStorage.setItem("previousId", res.data[0].seq);
            navigate("/paper/", {
                state: {
                    testInfo: res.data[0]
                },
            });
        })
    }

    return(
        <>
            <div style={informationContainerStyle}>
                <div style={informationStyle}>
                    <Stack direction="column" style={{width: '100%'}}>
                        <Stack direction="row">
                            <h1 style={{width: '100%', paddingTop:'50px', paddingBottom:'30px', textAlign:'center'}}>Haeahn BIM Assessment Test</h1>
                        </Stack>
                        <Stack direction="column" style={{width: '80%', marginLeft:'10%', paddingBottom:'20px', textAlign:'left'}}>
                            <h3>* 시험 시간은 90분이며, 총 25개의 문향으로 구성되어 있습니다.</h3>
                            <h3>* 최종 제출 후에는 답안 변경이 불가능합니다.</h3>
                            <h3>* 출제 문항과 제공되는 문제파일의 외부 유출 및 무단 사용 등 보안에 유의해주시기 바랍니다.</h3>
                        </Stack>
                        <Stack direction="column" style={{width: '80%', marginLeft:'10%', paddingBottom:'30px', textAlign:'center', placeItems:'center'}}>
                            <h3>1. 아래의 파일을 다운 받아 문제풀이에 참고하십시오.</h3>
                            <span>압축 파일에는 '15_역량평가 문제파일.rvt', '해안신관 구조모델_230102', </span>
                            <span>’HAEAHN BIM TEMPLATE_EWG Export_건축.txt’ 3개의 파일이 포함되어 있습니다.</span>
                            <span>시험 시작 전, 파일을 다운 받은 후 압축을 풀어 건축, 구조 파일이 한 폴더에 위치하는지 확인하세요.</span>
                            <StyledButton style={{marginTop:'30px'}} onClick={() => {handleDowloadButtonClick()}}>문제파일 다운로드</StyledButton>
                        </Stack>
                        <Stack direction="column" style={{width: '80%', marginLeft:'10%', textAlign:'center', placeItems:'center'}}>
                            <h3>2. 시험 준비가 완료되면 아래의 버튼을 눌러 시험을 시작하십시오.</h3>
                            <StyledButton onClick={() => {handleStartButtonClick()}}>시험 시작</StyledButton>
                        </Stack>
                        <Stack direction="column" style={{width: '80%', marginLeft:'10%', textAlign:'center', placeItems:'center'}}>
                            <h4 style={{color: 'red', paddingTop:'15px'}}>{warning}</h4>
                        </Stack>
                    </Stack>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={dialogClose}
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
        </>
    );
}
export default Information;