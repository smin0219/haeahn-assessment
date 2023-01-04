import * as React from 'react'
import logoImg from '../images/logo.png';
import styles from '../styles/Admin.module.css'
import {Stack, TextField, Button, Input} from '@mui/material';
import { styled } from '@mui/material/styles';

function Admin() {

    const CreateButton = styled(Button)`
        width: 180px;
        height: 60px;
        border-radius: 10px;
        background-color: #004190;
        color: white;
        font-size: 15px;
        font-weight: bold;
        float: right;
        margin-left: auto;
        margin-right: 50px;
        &:hover,
        &:active {
            color: black;
            background-color: white;
        }
    `;

    return(
        <>
            <div className={styles.adminContainer}>
                <Stack direction="column" style={{width:'100%'}}>
                    <div style={{borderStyle: "solid", borderWidth: "0 0 4px 0", borderColor: '#F1F1F1'}}>
                        <Stack direction="row" style={{width:'100%'}}>
                            <div className={styles.logoContainer}>
                                <img src={logoImg} alt="logo" />
                            </div>
                            <div className={styles.topNavigationBar}>
                                <CreateButton>CREATE QUESTION</CreateButton>
                            </div>
                        </Stack>
                    </div>
                    <Stack direction="row">
                        <div className= {styles.leftNavigationBar}>
                            
                        </div>
                        <div style={{flex:6}}>
                            <Stack direction="column">
                                <div className={styles.titleBar}> 
                                    <Stack direction='row'>
                                        <p style={{width: '5%', textAlign:'center'}}>#</p>
                                        <p style={{width: '70%', textAlign:'center'}}>title</p>
                                        <p style={{width: '15%', textAlign:'center'}}>created by</p>
                                        <p style={{width: '5%', textAlign:'center'}}>delete</p>
                                    </Stack>
                                </div>
                                <div className={styles.questionContainer}>
                                    <Stack direction='row'>
                                        <p style={{width: '5%', fontSize:"17px", textAlign:'center'}}>1.</p>
                                        <p style={{width: '70%', fontSize:"20px", fontWeight:"bold", textAlign:'center'}}>titletitletitletitletite</p>
                                        <p style={{width: '15%', fontSize:"17px", textAlign:'center'}}>created by</p>
                                        <p style={{width: '5%', fontSize:"17px", textAlign:'center'}}>delete</p>
                                    </Stack>
                                    <Stack direction='row'>
                                        <p style={{width: '5%', fontSize:"17px", textAlign:'center'}}>2.</p>
                                        <p style={{width: '70%', fontSize:"20px", fontWeight:"bold", textAlign:'center'}}>titletitletitletitletite</p>
                                        <p style={{width: '15%', fontSize:"17px", textAlign:'center'}}>created by</p>
                                        <p style={{width: '5%', fontSize:"17px", textAlign:'center'}}>delete</p>
                                    </Stack>
                                    <Stack direction='row'>
                                        <p style={{width: '5%', fontSize:"17px", textAlign:'center'}}>3.</p>
                                        <p style={{width: '70%', fontSize:"20px", fontWeight:"bold", textAlign:'center'}}>titletitletitletitletite</p>
                                        <p style={{width: '15%', fontSize:"17px", textAlign:'center'}}>created by</p>
                                        <p style={{width: '5%', fontSize:"17px", textAlign:'center'}}>delete</p>
                                    </Stack>
                                    <Stack direction='row'>
                                        <p style={{width: '5%', textAlign:'center'}}>4.</p>
                                        <p style={{width: '70%', fontSize:"20px", fontWeight:"bold", textAlign:'center'}}>titletitletitletitletite</p>
                                        <p style={{width: '15%', textAlign:'center'}}>created by</p>
                                        <p style={{width: '5%', textAlign:'center'}}>delete</p>
                                    </Stack>
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                </Stack>
            </div>
        </>
        
    );
}
export default Admin;