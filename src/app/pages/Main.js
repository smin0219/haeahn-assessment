import * as React from 'react';
import logoImg from '../images/logo.png';
import backgroundImg from '../images/background.png';
import styles from '../styles/App.module.css';
import Login from './Login';
import {Paper} from '@mui/material';

function Main(){
    return (
        <>
            <div>
                <Paper
                    style={{
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: "cover",
                        height: "calc(100vh - 72px)",
                    }}
                >
                    <Login/>
                </Paper>
            </div>
            <div style={{float:'right', padding:'10px 30px 0 0'}}>
                <img src={logoImg} className={styles.logoImg} alt="logo" />
            </div>
        </>
    );
}
export default Main