import * as React from 'react'
import logoImg from '../images/logo.png';
import moment from 'moment';
import styles from '../styles/Admin.module.css'
import {
    Stack, 
    ToggleButton, 
    ToggleButtonGroup, 
    Button, 
    TextField, 
    InputAdornment, 
    CardContent, 
    Grid,
    IconButton,
    Box,
    Radio
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { GetQuiz, SetQuiz, DelQuiz, SetQuizChoices, SetQuizMedia } from '../data/Data';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import DeleteIconFilled from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
    CardHeader, 
    CenterModal, 
    ModalHeadText, 
    ModalInput, 
    ModalLableText, 
    ModalTextField, 
    ToggleTextField,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    TypeButtonGroup, 
    useModalToggle 
} from '../Modal/Modal';

function Admin() {

    const { on, open, close } = useModalToggle();

    const GroupToggleButton = styled(ToggleButton)`
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
    const [isUpdated, setIsUpdated] = React.useState(false);
    const [quiz, setQuiz] = React.useState();
    const [quiz_group, setQuizGroup] = React.useState('ALL');
    const [currentQuestion, setCurrentQuestion] = React.useState({});

    const handleToggleButtonChange = (e) => {
        setQuizGroup(e.target.value);
    }; 

    const QuestionTitleButton = styled(Button)`
        margin: 0;
        padding: 0;
        font-weight: 550;
        border-radius: 10px;
        color:black;
        height: 50px;
    `;

    React.useEffect(() => {
        GetQuiz().then((res) => {
            var quiz = res.data;
            if(quiz_group === 'ALL'){
                setQuiz(quiz);
            }
            else{
                setQuiz(quiz.filter(question => question.quiz_group === quiz_group));
            }
        });
    }, [isUpdated, quiz_group]);

    const handleCreateButtonClick = (question) => {
        setCurrentQuestion(question);
        open();
    };

    const handleDeleteClick = async (question) => {
        await DelQuiz(question.seq);
        setIsUpdated(!isUpdated);
    };

    return(
        <>
            <div className={styles.adminContainer}>
                <Stack direction="column" style={{width:'100%', padding:0, margin:0}}>
                    <div style={{borderStyle: "solid", borderWidth: "0 0 4px 0", borderColor: '#F1F1F1', width:'100%', margin:'0', padding:'0'}}>
                        <Stack direction="row" style={{width:'100%'}}>
                            <div className={styles.logoContainer}>
                                <img src={logoImg} alt="logo" />
                            </div>
                            <div className={styles.topNavigationBar}>
                                <OpenModalButton isUpdated={isUpdated} setIsUpdated={setIsUpdated}></OpenModalButton>
                            </div>
                        </Stack>
                    </div>
                    <Stack direction="row">
                        <div className= {styles.leftNavigationBar}>
                            <Stack direction="column">
                                <TextField 
                                    id="standard-basic"
                                    label={"문제 검색"}
                                    placeholder={"제목을 입력해 주세요."} 
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
                                            <GroupToggleButton value='ALL' selected={quiz_group==='ALL'} style={{width: "265px", margin:'15px 0 0 0'}}>ALL</GroupToggleButton>
                                        </ToggleButtonGroup>
                                        <Stack direction="row">
                                            <ToggleButtonGroup
                                                onChange={(e) => handleToggleButtonChange(e)}
                                            >
                                                <GroupToggleButton value='A' selected={quiz_group==='A'} style={{width: "130px", margin:'5px 6px 0 0'}}>A</GroupToggleButton>
                                                <GroupToggleButton value='B' selected={quiz_group==='B'} style={{width: "130px", margin:'5px 0 0 0'}}>B</GroupToggleButton>
                                            </ToggleButtonGroup>
                                        </Stack>
                                    </Stack>
                            </Stack>
                            
                        </div>
                        <div style={{width:'100%'}}>
                            <Stack direction="column">
                                <div className={styles.titleBar}> 
                                    <Stack direction='row' style={{width:'100%'}}>
                                        <div style={{width:'5%', textAlign:'center'}}>#</div>
                                        <div style={{width:'70%', textAlign:'center'}}>제목</div>
                                        <div style={{width:'8%', textAlign:'center'}}>문제 유형</div>
                                        <div style={{width:'8%', textAlign:'center'}}>출제자</div>
                                        <div style={{width:'8%', textAlign:'center'}}>삭제</div>
                                    </Stack>
                                </div>
                                {
                                    quiz !== undefined ? 
                                        quiz.map((question, idx) => {
                                            return(
                                                <div className={styles.questionContainer} key={idx}>
                                                    <Stack direction='row' style={{width:'100%'}}>
                                                        <div style={{width:'5%', textAlign:'center', padding: '10px 0 12px 0'}}>{idx+1}.</div>
                                                        <QuestionTitleButton 
                                                            style={{width:'70%', paddingLeft:'50px', textAlign:'left', display:'block', maxWidth:'1250px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',fontWeight:'550'}}
                                                            onClick={() => 
                                                            {
                                                                handleCreateButtonClick(question);
                                                            }}
                                                        >
                                                            {question.content}
                                                        </QuestionTitleButton>
                                                        <div style={{width:'8%', textAlign:'center', padding: '10px 0 12px 0'}}>{question.quiz_group}</div>
                                                        <div style={{width:'8%', textAlign:'center', padding: '10px 0 12px 0'}}>{question.author}</div>
                                                        <div style={{width:'8%', textAlign:'center', padding: '10px 0 12px 0'}}>{
                                                            <DeleteIcon
                                                                style={{cursor:'pointer'}}
                                                                onClick={(e) => {
                                                                    handleDeleteClick(question);
                                                                }}>
                                                            </DeleteIcon>}
                                                        </div>
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

function OpenModalButton(props){

    const CreateButton = styled(Button)`
        width: 200px;
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

    const CreateQuestionButton = styled(Button)`
        width: 100%;
        height: 60px;
        border-radius: 10px;
        background-color: lightgrey;
        color: white;
        font-size: 15px;
        font-weight: bold;
        float:center;
        &:hover,
        &:active {
            color: white;
            background-color: #2196f3;
        }
    `;

    const ModalCard = styled("div")`
        background-color: #ffffff;
        border-radius: 10px;
        width: 800px;
        margin: 0 auto;
        ::-webkit-scrollbar {
            display: none;
        }
    `;

    const GroupToggleButton = styled(ToggleButton)`
        border-radius: 5px;
        background-color: lightgrey;
        color: black;
        width: 120px;
        height: 40px;
        font-size: 15px;
        margin-right: 5px;
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
    const [question, setQuestion] = React.useState(Question());
    const [choices, setChoices] = React.useState({});

    const [selectedGroup, setSelectedGroup] = React.useState('A');
    const [selectedCategory, setSelectedCategory] = React.useState('인터페이스');
    const [selectedImages, setSelectedImages]= React.useState([]);
    const [selectedFiles, setSelectedFiles]= React.useState([]);
    const [answer, setAnswer] = React.useState(1);

    const { on, open, close } = useModalToggle();
    const selectedImageRef = React.useRef(null);
    
    const handleCreateButtonClick = () => {
        setQuestion(Question());
        open();
    }

    const handleTitleOnChange = (e) => {
        question.content = e.target.value;
    }

    const handlePurposeOnChange = (e) => {
        question.meaning = e.target.value;
    }

    const handleGroupButtonChange = (e) => {
        setSelectedGroup(e.target.value);
        question.quiz_group = e.target.value;
    }; 

    const handleCategoryButtonChange = (e) => {
        setSelectedCategory(e.target.value);
        question.category = e.target.value;
    }; 

    const handleAddImageClick = (e) => {
        selectedImageRef.current.click();
    };

    const handleRemoveImageClick = (e) => {
        setSelectedImages([]);
        setSelectedFiles([]);
    };

    const handleSelectedImagesChange = (e) => {
        let files = [];
        let images = [];
        for(let i=0; i<e.target.files.length; i++){
            files.push(e.target.files[i]);
            images.push(e.target.files[i]);
        }
        setSelectedImages(images);
        setSelectedFiles(files);
    };

    const handleChoicesOnChange = (e, idx) => {
        // let choice = Choice(-1,0,e.target.value);
        choices[idx] = e.target.value;
        setChoices(choices);
    }

    const handleCreateAQuestionClick = () => {
        question.seq = -1;
        question.quiz_group = selectedGroup;

        let choiceList = {};

        Object.keys(choices).forEach((key,idx) => {
            choiceList[idx] = Choice(-1,0,choices[key]);
        })
        
        SetQuiz(question).then((res) => {
            SetQuizChoices(choiceList, res.data);
            SetQuizMedia(selectedFiles, res.data);
        })
        props.setIsUpdated(!props.isUpdated);
        close();
    }

    const handleAnswerClick = (e, idx) => {
        setAnswer(idx);
    }

    React.useEffect(() => {
    },[selectedGroup, selectedCategory]);

    return(
        <>
            <CreateButton
                onClick={() => {
                    handleCreateButtonClick();
                }}
            >
                문제 생성
            </CreateButton>
            <CenterModal open={on} onClose={close}>
                <ModalCard>
                    <CardHeader direction="row" justifyContent="space-between">
                        <p style={{padding:'10px 0 0 10px', fontSize:'20px', fontWeight:'550', margin:0}}>문제 생성</p>
                    </CardHeader>
                    <CardContent style={{ padding: 10}}>
                        <Stack sx={{ p: 6 }}>
                            <Grid container spacing={3} sx={{ backgroundColor: '#F8FAFB', width:'730px', height:'700px', paddingBottom:'40px', overflow:'auto'}}>
                                <Grid item>
                                    <ModalLableText sx={{ pt: 2}} >제목</ModalLableText>
                                    <ModalTextField sx={{width: '650px'}} type="text" defaultValue={question.content} onChange={(e) => {handleTitleOnChange(e)}} size="small"></ModalTextField>
                                    <ModalLableText sx={{ pt: 2}} >출제 의도</ModalLableText>
                                    <ModalTextField sx={{width: '650px'}} type="text" defaultValue={question.meaning} onChange={(e) => {handlePurposeOnChange(e)}} size="small"></ModalTextField>
                                    <Stack direction="row">
                                        <Stack direction="column">
                                            <ModalLableText sx={{ pt: 2 }}>유형</ModalLableText>
                                            <Stack direction="row" sx={{ flex: 1, pb: 2 }}>
                                                <ToggleButtonGroup 
                                                    onChange={(e) => {handleGroupButtonChange(e)}} 
                                                    exclusive color="primary"
                                                >
                                                    <GroupToggleButton value={'A'} selected={selectedGroup==='A'}>A</GroupToggleButton>
                                                    <GroupToggleButton value={'B'} selected={selectedGroup==='B'}>B</GroupToggleButton>
                                                </ToggleButtonGroup>
                                            </Stack>
                                            <ModalLableText sx={{ pt: 2 }}>카테고리</ModalLableText>
                                            <ToggleButtonGroup 
                                                onChange={(e) => {handleCategoryButtonChange(e)}} 
                                                exclusive color="primary"
                                            >
                                                <GroupToggleButton value={'인터페이스'} selected={selectedCategory==='인터페이스'}>인터페이스</GroupToggleButton>
                                                <GroupToggleButton value={'모델링'} selected={selectedCategory==='모델링'}>모델링</GroupToggleButton>
                                                <GroupToggleButton value={'도면화'} selected={selectedCategory==='도면화'}>도면화</GroupToggleButton>
                                                <GroupToggleButton value={'데이터 활용'} selected={selectedCategory==='데이터 활용'}>데이터 활용</GroupToggleButton>
                                                <GroupToggleButton value={'협업/관리'} selected={selectedCategory==='협업/관리'}>협업/관리</GroupToggleButton>
                                            </ToggleButtonGroup>
                                        </Stack>
                                    </Stack>
                                    <ModalLableText sx={{ pt: 5 }}></ModalLableText>
                                    <Stack direction='row' sx={{width: '650px'}}>
                                        <div style={{padding:'3px 10px 0 0'}}><Radio checked={answer===1} value={1} onChange={(e) => handleAnswerClick(e, 1)}></Radio></div>
                                        <ModalTextField defaultValue={choices[1]} onChange={(e) => {handleChoicesOnChange(e, 1)}} size="small"></ModalTextField>
                                    </Stack>
                                    <Stack direction='row' sx={{width: '650px'}}>
                                        <div style={{padding:'3px 10px 0 0'}}><Radio checked={answer===2} onChange={(e) => handleAnswerClick(e, 2)}></Radio></div>
                                        <ModalTextField defaultValue={choices[2]} onChange={(e) => {handleChoicesOnChange(e, 2)}} size="small"></ModalTextField>
                                    </Stack>
                                    <Stack direction='row' sx={{width: '650px'}}>
                                        <div style={{padding:'3px 10px 0 0'}}><Radio checked={answer===3} onChange={(e) => handleAnswerClick(e, 3)}></Radio></div>
                                        <ModalTextField defaultValue={choices[3]} onChange={(e) => {handleChoicesOnChange(e, 3)}} size="small"></ModalTextField>
                                    </Stack>
                                    <Stack direction='row' sx={{width: '650px'}}>
                                        <div style={{padding:'3px 10px 0 0'}}><Radio checked={answer===4} onChange={(e) => handleAnswerClick(e, 4)}></Radio></div>
                                        <ModalTextField defaultValue={choices[4]} onChange={(e) => {handleChoicesOnChange(e, 4)}} size="small"></ModalTextField>
                                    </Stack>
                                    <Stack direction='row' style={{marginTop:'10px'}}>
                                        <IconButton
                                            style={{borderStyle:'solid', borderWidth:'1px', borderColor:'darkgrey', width:'50px', height:'50px', margin:'9px 15px 40px 0'}}
                                            onClick={(e) => {
                                                handleAddImageClick(e);
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <ModalLableText sx={{ pt: 3 }}>이미지 (최대 추가 가능한 이미지 수: 2)</ModalLableText>
                                        {selectedImages !== undefined && selectedImages.length > 0 ? 
                                            <>
                                                <IconButton
                                                    style={{borderStyle:'solid', borderWidth:'1px', borderColor:'darkgrey', width:'50px', height:'50px', margin:'10px 15px 40px 40px'}}
                                                    onClick={(e) => {
                                                        handleRemoveImageClick(e);
                                                    }}
                                                >
                                                    <DeleteIconFilled/>
                                                </IconButton>
                                                <ModalLableText sx={{ pt: 3 }}>이미지 전체 삭제</ModalLableText>
                                            </>
                                        : <></>}
                                    </Stack>
                                    <Stack direction="column">
                                        <input
                                            type="file"
                                            multiple
                                            ref={selectedImageRef}
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                handleSelectedImagesChange(e);
                                            }}
                                        />
                                        <Stack direction="row">

                                            {selectedImages.map((image) => {
                                                <Box
                                                    style={{
                                                        border: '1px solid #DDDDDD',
                                                        width: '100px',
                                                        height: '100px',
                                                        // marginBottom: '50px',
                                                        marginRight: '10px',
                                                        borderRadius: '10px'
                                                    }}>
                                                </Box>
                                                return(<img src={URL.createObjectURL(image)} alt="thumbnail" style={{width:'100px', height:'100px', borderRadius:'10px', marginRight:'10px', marginBottom:'50px'}}/>)
                                            })}

                                            
                                        </Stack>
                                        <CreateQuestionButton onClick={() => {handleCreateAQuestionClick()}}>문제 생성</CreateQuestionButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </CardContent>
                </ModalCard>
            </CenterModal>
        </>
    )
}

function Media(
    seq = -1,
    quiz_id = 0,
    images = '',
    link = '',
    file = {},
){
    return{
        seq: seq,
        quiz_id: quiz_id,
        images: images,
        link: link,
        file: file
    }
}

function Choice(
    seq = -1,
    quiz_id = 0,
    content = '',
    selected = false,
    is_correct = false,
){
    return{
        seq: seq,
        quiz_id: quiz_id,
        content: content,
        selected: selected,
        is_correct: is_correct
    }
}

function Question(
    seq = -1,
    content = '',
    difficulty = '1',
    meaning = '',
    competency = '상',
    quiz_group = 'A',
    quiz_type = '객관식',
    author = 'admin',
    category = '',
    // issue_date = '',
    // Media = [],
    // Choices = [],
){
    return {
        seq: seq,
        content: content,
        difficulty: difficulty,
        meaning: meaning,
        competency: competency,
        quiz_group: quiz_group,
        quiz_type: quiz_type,
        author: author,
        category: category,
        // issue_date: issue_date,
        // Media: Media,
        // Choices: Choices,
    }
}



export default Admin;