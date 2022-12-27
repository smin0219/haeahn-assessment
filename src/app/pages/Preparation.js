import * as React from 'react';
import logoImg from '../images/logo.png';
import backgroundImg from '../images/background.png';
import styles from '../styles/App.module.css';
import Information from './Information';
import {Paper} from '@mui/material';


function Preparation(){
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
                    <Information/>
                </Paper>
            </div>
            <div>
                <img src={logoImg} className={styles.logoImg} alt="logo" />
            </div>
        </>
    );
}
export default Preparation;