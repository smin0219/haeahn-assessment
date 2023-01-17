import * as React from 'react';
import {useLocation} from 'react-router-dom';
import styles from '../styles/Result.module.css';
import logoImg from '../images/logo.png';
import {Paper} from '@mui/material';
import {Stack, TextField, Button, Input} from '@mui/material';
import backgroundImg from '../images/background.png';

function Result(props) {

    const location = useLocation();
    const profileImg = "https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/" + location.state.id + ".jpg";

    React.useEffect(() => {
        
    },[]);

    return (
        <>
             <Paper
                    style={{
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: "cover",
                        height: "100vh",
                    }}
                >
                <div className={styles.resultContainer}>
                    <div className={styles.profileContainer}>
                        <h2 className={styles.title}>Haeahn BIM Assessment Test Results</h2>
                        <Stack direction='row' style={{backgroundColor:'red', alignItems:'center', margin:'30px 0 0 0', paddingLeft:'80px'}}>
                            <img src={profileImg} className={styles.profileImg} alt='profile'></img>
                            <Stack direction='row'>
                                <Stack direction='column' style={{backgroundColor:'blue', marginLeft:'50px', textAlign:'center'}}>
                                    <div className={styles.profileTitle}>홍길동</div>
                                    <div className={styles.profileContent}>선임 / 0년차</div>
                                    <div className={styles.profileContent}>00부문 / 00실</div>
                                </Stack>
                                <Stack direction='column' style={{backgroundColor:'yellow', marginLeft:'60px', textAlign:'center'}}>
                                    <div className={styles.profileTitle}>시험회차</div>
                                    <div className={styles.profileContent}>2023 신입사원</div>
                                </Stack>
                                <Stack direction='column' style={{backgroundColor:'green', marginLeft:'60px', textAlign:'center'}}>
                                    <div className={styles.profileTitle}>총 점</div>
                                    <div className={styles.profileContent}>00/100</div>
                                </Stack>
                            </Stack>
                        </Stack>
                    </div>
                </div>

            </Paper>
            
        </>
    )
}
export default Result;