import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function RadioButtonsGroup(props) {

  const handleButtonClicked = (e) => {
    var solvedQuestions = props.solvedQuestions;
    solvedQuestions[props.questionNumber] = e.target.value;
    props.setSolvedQuestions(solvedQuestions);
    props.setIsUpdated(!props.isUpdated);
  }

  return (
    <FormControl style={{paddingTop:'20px'}}>
      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {props.choices !== undefined ? props.choices.map((choice, idx) => {
            return (
                <FormControlLabel 
                    key={idx}
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