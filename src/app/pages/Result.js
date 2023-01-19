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

const AutodeskButton = styled(Button) `
    background-color: #5b9bd5;
    color: white;
    height: 22px;
    width: 140px;
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

    React.useEffect(() => {
        RadarChart();
        BarChart();
        PieChart();
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
                                    <div className={styles.profileTitle} style={{textAlign:'left'}}>{userInfo.resultUserName}</div>
                                    <div className={styles.profileContent} style={{textAlign:'left'}}>{userInfo.resultTitleName} / 0년차</div>
                                    <div className={styles.profileContent} style={{textAlign:'left'}}>{userInfo.resultDeptName} </div>
                                </Stack>
                                <Stack direction='column' style={{ marginLeft:'60px', textAlign:'center'}}>
                                    <div className={styles.profileTitle}>시험회차</div>
                                    <div className={styles.profileContent}>2023 신입사원</div>
                                    <div className={styles.profileContent}>교육 후 평가</div>
                                </Stack>
                                <Stack direction='column' style={{ marginLeft:'60px', textAlign:'center'}}>
                                    <div className={styles.profileTitle}>총점</div>
                                    <div className={styles.profileContent} style={{fontWeight:'bold', fontSize:'20px'}}>00/100</div>
                                </Stack>
                                <Stack direction='column' style={{ marginLeft:'60px', textAlign:'center'}}>
                                    <div className={styles.profileTitle}>Pass/Fail</div>
                                    <div className={styles.profileContent} style={{fontWeight:'bold', fontSize:'20px'}}>(추후운영)</div>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction='row' style={{marginLeft:'50px', marginTop:'50px'}}>
                            <Stack direction='column'>
                                <h4 style={{textAlign: 'center', marginBottom:'80px'}}>분야별 역량수준</h4>
                                <div className="radarChart" style={{width:'500px', height: '450px'}}></div>
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
                                    <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#b4c7e7'}}>인터페이스</div>
                                    <Stack direction='row' style={{display:'flex', alignItems:'center', borderBottom: '1px solid', borderColor: '#e1e1e1'}}>
                                        <div className={styles.wrongQuestionList}>View, Legend, Schedule과 Sheet의 관계 이해</div> 
                                        <AutodeskButton>Autodesk Help</AutodeskButton>
                                    </Stack>
                                    <div className={styles.wrongQuestionList}>Type, Instance, Shared Paramter에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Sheet에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Detail Line의 속성에 대한 정확한 이해</div>
                                    <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#bdd7ee'}}>모델링</div>
                                    <div className={styles.wrongQuestionList}>View, Legend, Schedule과 Sheet의 관계 이해</div>
                                    <div className={styles.wrongQuestionList}>Type, Instance, Shared Paramter에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Sheet에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Detail Line의 속성에 대한 정확한 이해</div>
                                    <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#f8cbad'}}>도면화</div>
                                    <div className={styles.wrongQuestionList}>View, Legend, Schedule과 Sheet의 관계 이해</div>
                                    <div className={styles.wrongQuestionList}>Type, Instance, Shared Paramter에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Sheet에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Detail Line의 속성에 대한 정확한 이해</div>
                                    <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#c5e0b4'}}>데이터 활용</div>
                                    <div className={styles.wrongQuestionList}>View, Legend, Schedule과 Sheet의 관계 이해</div>
                                    <div className={styles.wrongQuestionList}>Type, Instance, Shared Paramter에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Sheet에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Detail Line의 속성에 대한 정확한 이해</div>
                                    <div className={styles.wrongQuestionCategory} style={{backgroundColor: '#ffe699'}}>협업/관리</div>
                                    <div className={styles.wrongQuestionList}>View, Legend, Schedule과 Sheet의 관계 이해</div>
                                    <div className={styles.wrongQuestionList}>Type, Instance, Shared Paramter에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Sheet에 대한 이해</div>
                                    <div className={styles.wrongQuestionList}>Detail Line의 속성에 대한 정확한 이해</div>
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