import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RadioButtonsGroup(props) {
  return (
    <FormControl style={{paddingTop:'20px'}}>
      <FormLabel id="demo-radio-buttons-group-label">Answer:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onClick={() => {console.log()}}
      >
        {props.choices !== undefined ? props.choices.map((choice, idx) => {
            return (
                <FormControlLabel key={idx} value={choice.content} control={<Radio />} label={choice.content} />
            )
        }) : <></> }
      </RadioGroup>
    </FormControl>
  );
}
export default RadioButtonsGroup