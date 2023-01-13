import * as React from 'react'
import logoImg from '../images/logo.png';
import backgroundImg from '../images/background.png';
import styles from '../styles/App.module.css';
import {Paper} from '@mui/material';

const endContainerStyle = {
    display: 'flex', 
    width:'100%', 
    height:'100%', 
    justifyContent: 'center', 
    alignItems:'center', 
    position:'relative'
}

const endStyle = {
    minWidth: '800px',
    minHeight: '300px',
    borderRadius: '10px',
    position: 'absolute',
    opacity: 0.95,
    backgroundColor: 'white',
    justifyContent: 'center', 
    alignItems:'center',
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
                        <div style={endStyle}>
                            <div style={{textAlign:'center', fontSize:'25px', paddingTop:'100px'}}>제출이 완료되었습니다.</div> 
                            <div style={{textAlign:'center', fontSize:'25px', paddingTop:'10px' }}>수고하셨습니다.</div>
                            <div style={{textAlign:'center', marginTop:'40px', paddingBottom:'100px' }}>평가 결과는 1월 27일(금) 결과 조회 웹페이지를 통해 확인하실 수 있습니다. (추후 팀즈로 링크 공유)</div>
                        </div>
                    </div>

                </Paper>
            </div>
            <div style={{float:'right', padding:'10px 30px 0 0'}}>
                <img src={logoImg} className={styles.logoImg} alt="logo" />
            </div>
        </>
    )
}
export default End;