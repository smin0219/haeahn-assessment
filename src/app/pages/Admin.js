import * as React from 'react'
import logoImg from '../images/logo.png';
import styles from '../styles/Admin.module.css'
import {Stack, ToggleButton, ToggleButtonGroup, Button, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GetQuiz } from '../data/Data';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

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
            color: white;
            background-color: #2196f3;
        }
    `;

    const GroupButton = styled(ToggleButton)`
        border-radius: 5px;
        background-color: #B1B1B1;
        color: white;
        font-size: 15px;
        font-weight: bold;
        float: right;
        &:hover,
        &:active {
            color: white;
            background-color: #2196f3;
        };
        &.MuiToggleButton-root.Mui-selected{
            color: white;
            background-color: #004190;
           
        };
    `

    const QuestionCommon = styled('p')`
        position:relative;
        display:flex;
        justify-content: center;
        align-items: center;
        fontSize:17px;
        textAlign:left;
        padding:0;
        margin:0;
    `;

    const QuestionTitleButton = styled(Button)`
        width: 100%;
        height: 60px;
        margin: 0;
        padding: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 550;
        border-radius: 10px;
        color:black;
    `;

    const [quiz, setQuiz] = React.useState();
    const [isUpdated, setIsUpdated] = React.useState(false);
    const [group, setGroup] = React.useState('ALL');

    const handleCreateButtonClick = () => {
        console.log("create button clicked");
    }

    const handleToggleButtonChange = (e) => {
        setGroup(e.target.value);
    }; 

    React.useEffect(() => {
        GetQuiz().then((res) => {
            var quiz = res.data;
            if(group === 'ALL'){
                setQuiz(quiz);
            }
            else{
                setQuiz(quiz.filter(question => question.group === group));
            }
        });
    }, [isUpdated, group]);

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
                                <CreateButton
                                    onClick={() => {handleCreateButtonClick()}}
                                >
                                    CREATE QUESTION
                                </CreateButton>
                            </div>
                        </Stack>
                    </div>
                    <Stack direction="row">
                        <div className= {styles.leftNavigationBar}>
                            <Stack direction="column">
                                <TextField 
                                    id="standard-basic"
                                    label={"Search for a question"}
                                    placeholder={"Please enter question title"} 
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon></SearchIcon>
                                        </InputAdornment>
                                        )
                                    }}
                                    variant="outlined" 
                                    style={{width: '265px', marginTop: '60px'}} 
                                />
                                
                                    <Stack direction="column">
                                         <ToggleButtonGroup
                                            onChange={(e) => handleToggleButtonChange(e)}
                                        >
                                            <GroupButton value='ALL' selected={group==='ALL'} style={{width: "265px", margin:'15px 0 0 0'}}>ALL</GroupButton>
                                        </ToggleButtonGroup>
                                        <Stack direction="row">
                                            <ToggleButtonGroup
                                                onChange={(e) => handleToggleButtonChange(e)}
                                            >
                                                <GroupButton value='A' selected={group==='A'} style={{width: "130px", margin:'5px 6px 0 0'}}>A</GroupButton>
                                                <GroupButton value='B' selected={group==='B'} style={{width: "130px", margin:'5px 0 0 0'}}>B</GroupButton>
                                            </ToggleButtonGroup>
                                        </Stack>
                                        
                                    </Stack>
                                
                            </Stack>
                            
                        </div>
                        <div style={{flex:6, height:'auto'}}>
                            <Stack direction="column" style={{paddingBottom: '50px'}}>
                                <div className={styles.titleBar}> 
                                    <Stack direction='row'>
                                        <p style={{width: '5%', textAlign:'center'}}>#</p>
                                        <p style={{width: '68%', textAlign:'center'}}>title</p>
                                        <p style={{width: '5%', textAlign:'center'}}>group</p>
                                        <p style={{width: '12%', textAlign:'center'}}>author id</p>
                                        <p style={{width: '5%', textAlign:'center'}}>delete</p>
                                    </Stack>
                                </div>
                                {
                                    quiz !== undefined ? 
                                        quiz.map((question, idx) => {
                                            return(
                                                <div className={styles.questionContainer} key={idx}>
                                                    <Stack direction='row'>
                                                        <QuestionCommon style={{width: '5%'}}>{idx+1}.</QuestionCommon>
                                                        <QuestionCommon style={{width: '68%', fontSize:"17px", fontWeight:"550", textAlign:'center', padding:0, margin:0}}><QuestionTitleButton>{question.content}</QuestionTitleButton></QuestionCommon>
                                                        <QuestionCommon style={{width: '5%', fontSize:"17px", textAlign:'center', padding:0, margin:0}}>{question.group}</QuestionCommon>
                                                        <QuestionCommon style={{width: '12%', fontSize:"17px", textAlign:'center', padding:0, margin:0}}>{question.author}</QuestionCommon>
                                                        <QuestionCommon style={{width: '5%', fontSize:"17px", textAlign:'center', padding:0, margin:0}}>{<DeleteIcon></DeleteIcon>}</QuestionCommon>
                                                    </Stack>
                                                </div>
                                            )
                                        })
                                    : <></>
                                }
                            </Stack>
                        </div>
                    </Stack>
                </Stack>
            </div>
        </>
        
    );
}
export default Admin;