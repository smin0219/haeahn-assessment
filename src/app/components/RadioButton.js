import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {SetChoose} from '../data/Data';


function RadioButtonsGroup(props) {
  const handleButtonClicked = (e) => {
    var solvedQuestions = props.solvedQuestions;
    solvedQuestions[props.questionNumber] = e.target.value;
    props.setSolvedQuestions(solvedQuestions);
    
    if(e.target.value !== undefined){
      let chooseId = props.questionInfo.choices.filter((choice) => choice.content === e.target.value)[0].seq;
      debugger;
      SetChoose(props.testInfo.user_id, props.testInfo.seq, props.questionInfo.id, chooseId).then((res) => {
        props.setIsUpdated(!props.isUpdated);
      });
    }
  }

  return (
    <FormControl style={{paddingTop:'20px'}}>
      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {props.questionInfo.choices !== undefined ? props.questionInfo.choices.map((choice, idx) => {
          return (
              <FormControlLabel 
                  key={idx}
                  checked={choice.selected}
                  value={choice.content}
                  control={<Radio />}
                  label={choice.content}
                  onClick={(e) => { 
                    handleButtonClicked(e) 
                  }}
              />
          )
        }) : <></> }
      </RadioGroup>
    </FormControl>
  );
}
export default RadioButtonsGroup