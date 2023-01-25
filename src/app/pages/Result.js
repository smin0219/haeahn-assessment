import * as React from 'react';
import {useLocation} from 'react-router-dom';
import styles from '../styles/Result.module.css';
import logoImg from '../images/logo.png';
import {Paper} from '@mui/material';
import {Stack, TextField, Button, Input,} from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundImg from '../images/background.png';
import RadarChart from '../charts/RadarChart';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import { GetBarChartData, GetPieChartData, GetRidarChartData, GetUserResultData, GetResultLackData } from '../data/Data';

const AutodeskButton = styled(Button) `
    background-color: #5b9bd5;
    color: white;
    height: 22px;
    width: 145px;
    font-size: 10px;
    margin-right: 5px;
    &:hover,
    &:active {
        color: white ;
        background-color: #2196f3;
    }
`;

function Result(props) {

    const location = useLocation();
    const profileImg = "https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/" + location.state.id + ".jpg";

    const [id, setId] = React.useState(location.state.id);
    const [userInfo, setUserInfo] = React.useState(location.state.userInfo);
    const [userResult, setUserResult] = React.useState({});
    const [resultLack, setResultLack] = React.useState({});

    const resultLackList = (category) => {
        return(
            <>
                {resultLack[category].map((result, idx) => {
                    return(
                        <div key={idx}>
                            <Stack direction='row' style={{display:'flex', alignItems:'center', borderBottom: '1px solid', borderColor: '#e1e1e1'}}>
                                <div className={styles.wrongQuestionList}>{result.meaning}</div>
                                <AutodeskButton onClick={() => {window.open(result.autodesk_link, "_blank")}}>Autodesk Help</AutodeskButton>
                            </Stack>
                        </div>
                    )
                })}
            </>
        )
    }

    React.useEffect(() => {
        GetUserResultData(userInfo.resultMessage).then((res) => {
            setUserResult(res.data[0]);
        });

        GetRidarChartData(userInfo.resultMessage).then((res) => {
            RadarChart(res.data);
        });

        GetBarChartData(userInfo.resultMessage).then((res) => {
            BarChart(res.data);
        });

        GetPieChartData(userInfo.resultMessage).then((res) => {
            PieChart(res.data);
        })

        GetResultLackData(userInfo.resultMessage).then((res) => {
            let result = {
                "모델링": [],
                "도면화": [],
                "데이터 활용": [],
                "협업/관리": [],
                "인터페이스": []
            }

            for(let i=0; i<res.data.length; i++){
                switch (res.data[i].category){
                    case "모델링": result["모델링"].push(res.data[i]); continue;
                    case "도면화": result["도면화"].push(res.data[i]); continue;
                    case "데이터 활용": result["데이터 활용"].push(res.data[i]); continue;
                    case "협업/관리": result["협업/관리"].push(res.data[i]); continue;
                    case "인터페이스": result["인터페이스"].push(res.data[i]); continue;
                    default: break;
                }
            }

            setResultLack(result);
        })
    },[]);

    return (
        <>
             <Paper
                    style={{
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: "cover",
                        height: "100%",
                        width: '100%',
                        minWidth:'1700px',
                    }}
                >
                <div className={styles.resultContainer}>
                    <div className={styles.profileContainer}>
                        <h2 className={styles.title}>Haeahn BIM Assessment Test Results</h2>
                        <Stack direction='row' style={{alignItems:'center', margin:'50px 0 0 0', paddingLeft:'80px'}}>
                            <img src={profileImg} className={styles.profileImg} alt='profile'></img>
                            <Stack direction='row'>
                                <Stack direction='column' style={{marginLeft:'50px', textAlign:'center'}}>
                                    <Stack direction='row'>
                                        <div className={styles.profileTitle} style={{textAlign:'center', paddingRight:'10px'}}>{userInfo.resultUserName}</div>
                                        <div className={styles.profileTitle} style={{textAlign:'center'}}>{userInfo.resultTitleName}</div>
                                    </Stack>
                                    <div className={styles.profileContent} style={{textAlign:'center'}}>{userInfo.resultDeptName} </div>
                                </Stack>
                                <Stack direction='column' style={{ marginLeft:'60px', textAlign:'center'}}>
                                    <div className={styles.profileTitle}>시험회차</div>
                                    <div className={styles.profileContent}>2023 신입사원</div>
                                    <div className={styles.profileContent}>교육 후 평가</div>
                                </Stack>
                                <Stack direction='column' style={{ marginLeft:'60px', textAlign:'center'}}>
                                    <div className={styles.profileTitle}>총점</div>
                                    <div className={styles.profileContent} style={{fontWeight:'bold', fontSize:'20px'}}>{userResult.score}</div>
                                </Stack>
                                <Stack direction='column' style={{ marginLeft:'60px', textAlign:'center'}}>
                                    <div className={styles.profileTitle}>Pass/Fail</div>
                                    <div className={styles.profileContent} style={{fontWeight:'bold', fontSize:'20px'}}>(추후운영)</div>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction='row' style={{marginLeft:'50px', marginTop:'50px'}}>
                            <Stack direction='column'>
                                <h4 style={{textAlign: 'center', marginBottom:'50px'}}>분야별 역량수준</h4>
                                <div className="radarChart" style={{width:'650px', height: '450px'}}></div>
                            </Stack>
                            <Stack direction='column' style={{marginLeft:'50px'}}>
                                <h4 style={{textAlign: 'center'}}>총 참여시간(~90min)</h4>
                                <div className="barChart" style={{width:'400px', height: '160px', marginBottom:'20px'}}></div>
                                <h4 style={{textAlign: 'center'}}>분야별 참여시간</h4>
                                <div className="pieChart" style={{width:'400px', height: '330px'}}></div>
                            </Stack>
                            <Stack direction='column' style={{paddingRight:'50px'}}>
                                <h4 style={{textAlign: 'center', marginBottom:'33px'}}>분야별 부족역량</h4>
                                <div className={styles.wrongQuestionListContainer}>
                                    {Object.keys(resultLack).length > 0 ?
                                        <>
                                            <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#b4c7e7'}}>모델링</div>
                                            {resultLackList("모델링")}
                                            <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#bdd7ee'}}>도면화</div>
                                            {resultLackList("도면화")}
                                            <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#f8cbad'}}>데이터 활용</div>
                                            {resultLackList("데이터 활용")}
                                            <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#c5e0b4'}}>협업/관리</div>
                                            {resultLackList("협업/관리")}
                                            <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#ffe699'}}>인터페이스</div>
                                            {resultLackList("인터페이스")}
                                        </>
                                     : <></>}
                                </div>
                            </Stack>
                            
                        </Stack>
                    </div>
                </div>
            </Paper>
            
        </>
    )
}
export default Result;