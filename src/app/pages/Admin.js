import * as React from 'react'
import logoImg from '../images/logo.png';
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
import { GetQuiz, SetQuiz, DelQuiz, SetQuiz2 } from '../data/Data';
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
    const [group, setGroup] = React.useState('ALL');
    const [currentQuestion, setCurrentQuestion] = React.useState({});

    const handleToggleButtonChange = (e) => {
        setGroup(e.target.value);
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
            if(group === 'ALL'){
                setQuiz(quiz);
            }
            else{
                setQuiz(quiz.filter(question => question.group === group));
            }
        });
    }, [isUpdated, group]);

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
                                <OpenModalButton></OpenModalButton>
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
                                            <GroupToggleButton value='ALL' selected={group==='ALL'} style={{width: "265px", margin:'15px 0 0 0'}}>ALL</GroupToggleButton>
                                        </ToggleButtonGroup>
                                        <Stack direction="row">
                                            <ToggleButtonGroup
                                                onChange={(e) => handleToggleButtonChange(e)}
                                            >
                                                <GroupToggleButton value='A' selected={group==='A'} style={{width: "130px", margin:'5px 6px 0 0'}}>A</GroupToggleButton>
                                                <GroupToggleButton value='B' selected={group==='B'} style={{width: "130px", margin:'5px 0 0 0'}}>B</GroupToggleButton>
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
                                        <div style={{width:'70%', textAlign:'center'}}>title</div>
                                        <div style={{width:'8%', textAlign:'center'}}>group</div>
                                        <div style={{width:'8%', textAlign:'center'}}>author id</div>
                                        <div style={{width:'8%', textAlign:'center'}}>delete</div>
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
                                                            style={{width:'70%', textAlign:'left', display:'block', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',fontWeight:'550'}}
                                                            onClick={() => 
                                                            {
                                                                handleCreateButtonClick(question);
                                                            }}
                                                        >
                                                            {question.content+'asdfasdfasdasdfasdfsadffasdf'}
                                                        </QuestionTitleButton>
                                                        <div style={{width:'8%', textAlign:'center', padding: '10px 0 12px 0'}}>{question.group}</div>
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
        width: 300px;
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
        overflow-y: scroll;
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

    const [title, setTitle] = React.useState('');
    const [selectedGroup, setSelectedGroup] = React.useState('A');
    const [selectedCategory, setSelectedCategory] = React.useState('인터페이스');
    const [selectedImages, setSelectedImages]= React.useState([]);
    const [answer, setAnswer] = React.useState(1);

    const { on, open, close } = useModalToggle();
    const selectedImageRef = React.useRef(null);
    
    const handleCreateButtonClick = () => {
        open();
    }

    const handleTitleOnChange = (e) => {
        question.title = e.target.value;
    }

    const handleGroupButtonChange = (e) => {
        setSelectedGroup(e.target.value);
        question.group = e.target.value;
    }; 

    const handleCategoryButtonChange = (e) => {
        setSelectedCategory(e.target.value);
        question.categoryType = e.target.value;
    }; 

    const handleAddImageClick = (e) => {
        selectedImageRef.current.click();
    };

    const handleRemoveImageClick = (e) => {
        setSelectedImages([]);
    };

    const handleSelectedImagesChange = (e) => {
        let images = [];
        for(let i=0; i<e.target.files.length; i++){
            if(i>1){
                break;
            }
            images.push(e.target.files[i]);
        } 
        setSelectedImages(images);
    };

    const handleChoicesOnChange = (e, idx) => {
        question.Choices[idx] = e.target.value;
    }

    const handleCreateAQuestionClick = () => {
        SetQuiz(question);
    }

    const handleAnswerClick = (e, idx) => {
        debugger;
        setAnswer(idx);
    }

    React.useEffect(() => {
        console.log("hjere");
    },[]);

    return(
        <>
            <CreateButton
                onClick={() => {
                    handleCreateButtonClick();
                }}
            >
                CREATE QUESTION
            </CreateButton>
            <CenterModal open={on} onClose={close}>
                <ModalCard>
                    <CardHeader direction="row" justifyContent="space-between">
                        <p style={{padding:'10px 0 0 10px', fontSize:'20px', fontWeight:'550', margin:0}}>CREATE QUESTION</p>
                    </CardHeader>
                    <CardContent style={{ padding: 10}}>
                        <Stack sx={{ p: 6 }}>
                            <Grid container spacing={3} sx={{ backgroundColor: '#F8FAFB', width:'730px', height:'700px', paddingBottom:'40px', overflowY:'scroll' }}>
                                <Grid item>
                                    <ModalLableText sx={{ pt: 2}} >TITLE</ModalLableText>
                                    <ModalTextField sx={{width: '650px'}} type="text" defaultValue={question.title} onChange={(e) => {handleTitleOnChange(e)}} size="small"></ModalTextField>
                                    <Stack direction="row">
                                        <Stack direction="column">
                                            <ModalLableText sx={{ pt: 2 }}>GROUP</ModalLableText>
                                            <Stack direction="row" sx={{ flex: 1, pb: 2 }}>
                                                <ToggleButtonGroup 
                                                    onChange={(e) => {handleGroupButtonChange(e)}} 
                                                    exclusive color="primary"
                                                >
                                                    <GroupToggleButton value={'A'} selected={selectedGroup==='A'}>A</GroupToggleButton>
                                                    <GroupToggleButton value={'B'} selected={selectedGroup==='B'}>B</GroupToggleButton>
                                                </ToggleButtonGroup>
                                            </Stack>
                                            <ModalLableText sx={{ pt: 2 }}>CATEGORY TYPE</ModalLableText>
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
                                    <ModalLableText sx={{ pt: 5 }}>CHOICES</ModalLableText>
                                    <Stack direction='row' sx={{width: '650px'}}>
                                        <div style={{padding:'3px 10px 0 0'}}><Radio checked={answer===1} value={1} onChange={(e) => handleAnswerClick(e, 1)}></Radio></div>
                                        <ModalTextField defaultValue={question.Choices[1]} onChange={(e) => {handleChoicesOnChange(e, 1)}} size="small"></ModalTextField>
                                    </Stack>
                                    <Stack direction='row' sx={{width: '650px'}}>
                                        <div style={{padding:'3px 10px 0 0'}}><Radio checked={answer===2} onChange={(e) => handleAnswerClick(e, 2)}></Radio></div>
                                        <ModalTextField defaultValue={question.Choices[2]} onChange={(e) => {handleChoicesOnChange(e, 2)}} size="small"></ModalTextField>
                                    </Stack>
                                    <Stack direction='row' sx={{width: '650px'}}>
                                        <div style={{padding:'3px 10px 0 0'}}><Radio checked={answer===3} onChange={(e) => handleAnswerClick(e, 3)}></Radio></div>
                                        <ModalTextField defaultValue={question.Choices[3]} onChange={(e) => {handleChoicesOnChange(e, 3)}} size="small"></ModalTextField>
                                    </Stack>
                                    <Stack direction='row' sx={{width: '650px'}}>
                                        <div style={{padding:'3px 10px 0 0'}}><Radio checked={answer===4} onChange={(e) => handleAnswerClick(e, 4)}></Radio></div>
                                        <ModalTextField defaultValue={question.Choices[4]} onChange={(e) => {handleChoicesOnChange(e, 4)}} size="small"></ModalTextField>
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
                                        <ModalLableText sx={{ pt: 3 }}>ADD IMAGES (maximum number of images: 2)</ModalLableText>
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
                                                <ModalLableText sx={{ pt: 3 }}>REMOVE ALL IMAGES</ModalLableText>
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
                                        <CreateQuestionButton onClick={() => {handleCreateAQuestionClick()}}>CLICK HERE TO CREATE A QUESTION</CreateQuestionButton>
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

function Question(
    seq = '',
    author = '',
    title = '',
    group = '',
    category = '',
    categoryType = '',
    competency = '',
    content = '',
    difficulty = '',
    meaning = '',
    Choices = {},
    Media = [],
    images = [],
    choose = {},

){
    return {
        seq: seq,
        title: title,
        group: group,
        category: category,
        categoryType: categoryType,
        competency: competency,
        content: content,
        difficulty: difficulty,
        meaning: meaning,
        Choices: Choices,
        images: images,
        Media: Media,
        choose: choose
    }
}

export default Admin;