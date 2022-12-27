import * as React from 'react'
import logoImg from '../images/logo.png';
import backgroundImg from '../images/background.png';
import styles from '../styles/App.module.css';
import {Paper} from '@mui/material';

const endContainerStyle = {
    minWidth: '800px',
    minHeight: '300px',
    top: '30%',
    left: '33%',
    borderRadius: '10px',
    position: 'absolute',
    opacity: 0.95,
    backgroundColor: 'white',
};

function End(){
    return(
        <>
            <div>
                <Paper
                    style={{
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: "cover",
                        height: "calc(100vh - 72px)",
                    }}
                >
                    <div style={endContainerStyle}>
                        <h1 style={{textAlign:'center', marginTop:'12%'}}>제출이 완료되었습니다.</h1>
                        <h1 style={{textAlign:'center'}}>수고하셨습니다.</h1>
                    </div>
                </Paper>
            </div>
            <div>
                <img src={logoImg} className={styles.logoImg} alt="logo" />
            </div>
        </>
    )
}
export default End;