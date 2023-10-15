import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box'; // Make sure to import Box from Material-UI
import { getFormByID, getQuestions, postResponse } from '../Actions/Actions';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';


function EmployeeForm() {
  const { formID, employeeID } = useParams();
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [formInfo, setFormInfo] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function asyncGetQuestions() {
      try {
        const report = await getQuestions(formID); // Assuming you want to get questions for employee 34
        const formDetails = await getFormByID(formID);
        console.log(formDetails);
        setFormInfo(formDetails);
        console.log(report);
        setQuestions(report);
        const tempObj = {employee_id : employeeID, answers: []};
        report.map((item) => (
            tempObj.answers.push({
                question_id: item.question_id,
                answer: ""
            })
        ))
        setResponses(tempObj);
      } catch (error) {
        console.error(error);
      }
    }
    asyncGetQuestions();
  }, []); 

  const submit = () => {
    if(done) {
        enqueueSnackbar('you have already submitted', { variant: "error" });
        return;
    }
    console.log(responses);
    let shouldPost = true;
    responses.answers.forEach((entry) => {
        if (entry.answer == "") {
            shouldPost = false;
          return;
        }
      });
      if(shouldPost && !done) {
        setDone(true);
        postResponse(responses);
        enqueueSnackbar('we have recieved your response', { variant: "success" });
      }
      else {
        enqueueSnackbar('please answer all the questions', { variant: "error" });
      }
  }

const updateAnswers = (id, newVal) => {
    setResponses(prevMyObject => ({
        ...prevMyObject,
        answers: responses.answers.map(obj => {
          if (obj.question_id === id) {
            return { ...obj, answer: newVal };
          }
          return obj;
        })
      }));
  }


  return (
    <div>
    <SnackbarProvider />

    <Typography variant="h3" sx={{color:'#E66E15', padding: 2, margin: 2, }}>Clarity Forms</Typography>
    <Typography variant="h5" sx={{padding: 2, margin: 2, }}>{formInfo.title}</Typography>
    <Typography variant="h6" sx={{padding: 2, margin: 2, }}>{formInfo.form_description}</Typography>
      {
        questions.map((item) => (
            <Box
            key={item.question_id}
            component="div"
          sx={{
            // backgroundColor: '#E66E15',
            padding: 2,
            margin: 2,
            border: '1px solid #E66E15',
            borderRadius: '4px', // Add rounded corners
          }}
            >
            <Typography variant="h6">{item.text}</Typography>
            <Typography variant="body1">Category: {item.category}</Typography>
            <Typography variant="body1">1 (negative) to 7 (positive)</Typography>
            <br></br>
            <FormControl variant="outlined">
            {/* <InputLabel htmlFor={`question-dropdown-${item.question_id}`}>Select a rating</InputLabel> */}
            <Select
              label=""
              labelId={`question-dropdown-${item.question_id}`}
              id={`question-dropdown-${item.question_id}`}
              value={(responses.answers.find(obj => obj.question_id === item.question_id)).answer}
                onChange={(e) => updateAnswers(item.question_id, e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
            </Box>
        ))
      }
      <Button variant="contained" sx = {{padding: 2, margin: 2, backgroundColor: '#E66E15'}} onClick = {() => {submit()}}>Submit Form</Button>
    </div>
  );
}

export default EmployeeForm;