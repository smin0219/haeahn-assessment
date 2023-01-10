import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {Stack, TextField, Button, Input} from '@mui/material';
import { styled } from '@mui/material/styles';
import {DownloadFile} from '../data/Data'
import fileDownload from 'js-file-download';

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

    const [downloaded, setDownloaded] = React.useState(false);
    const [warning, setWarning] = React.useState("");

    const navigate = useNavigate();

    const handleDowloadButtonClick = () => {
        var url = "https://bim.haeahn.com/certification/files/rac_basic_sample_project.rvt";
        var filename = "haeahn-assessment.rvt";
        DownloadFile(url, filename);
        setDownloaded(true);
    }

    const handleStartButtonClick = (employeeId) => {
        if(downloaded){
            navigate("/paper/", {
                state: {
                    employeeId: employeeId
                },
            });
        }
        else{
            setWarning("**시험을 시작하기 전에 문제파일을 먼저 다운로드 해주십시오**");
        }
    }

    return(
        <div style={informationContainerStyle}>
            <div style={informationStyle}>
                <Stack direction="column" style={{width: '100%'}}>
                    <Stack direction="row">
                        <h1 style={{width: '100%', paddingTop:'50px', paddingBottom:'30px', textAlign:'center'}}>Haeahn BIM Assessment Test</h1>
                    </Stack>
                    <Stack direction="column" style={{width: '80%', marginLeft:'10%', paddingBottom:'40px', textAlign:'left'}}>
                        <h3>* 시험 시간은 90분이며, 총 25개의 문향으로 구성되어 있습니다.</h3>
                        <h3>* 모든 문제는 하나의 답안이 선택되어야 하며, 문제 풀이는 하지 않을 경우 제출이 불가능합니다.</h3>
                        <h3>* 최종 제출 후에는 답안 변경이 불가능하므로 신중하게 제출하여 주십시오.</h3>
                        <h3>* 본 출제 내용을 외부로 유출 시 회사 규정에 의거하여 인사상의 불이익을 받을 수도 있습니다.</h3>
                    </Stack>
                    <Stack direction="column" style={{width: '80%', marginLeft:'10%', paddingBottom:'30px', textAlign:'center', placeItems:'center'}}>
                        <h3>1. 아래의 파일을 다운 받아 문제풀이에 참고하십시오.</h3>
                        <StyledButton onClick={() => {handleDowloadButtonClick()}}>문제파일 다운로드</StyledButton>
                    </Stack>
                    <Stack direction="column" style={{width: '80%', marginLeft:'10%', textAlign:'center', placeItems:'center'}}>
                        <h3>2. 시험 준비가 완료되면 아래의 버튼을 눌러 시험을 시작하십시오.</h3>
                        <StyledButton onClick={() => {handleStartButtonClick(props.employeeId)}}>시험 시작</StyledButton>
                    </Stack>
                    <Stack direction="column" style={{width: '80%', marginLeft:'10%', textAlign:'center', placeItems:'center'}}>
                        <h4 style={{color: 'red', paddingTop:'15px'}}>{warning}</h4>
                    </Stack>
                </Stack>
            </div>
        </div>

    );
}
export default Information;