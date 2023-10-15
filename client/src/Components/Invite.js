import {React, useState, useEffect} from 'react';
import CompleteHeader from './Header/CompleteHeader';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = "https://dh-backend-fr-fd4331759334.herokuapp.com"

const Invite = () => {
    const [emailText, setEmailText] = useState('');
    const [nameText, setNameText] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    if (nameText === '') {
      navigate('/invite')
    }
  }, [nameText])

    const submit = async () => {
        if(!emailText.includes('@') || emailText.length < 5 || nameText.length < 6) {
            enqueueSnackbar('Please format your input properly', { variant: "error" });
        }
        else {
            //Call API here
            //on success call the success toast
            // enqueueSnackbar('Employee invitied', { variant: "success" });
            var userStr = localStorage.getItem('user')
            var user = JSON.parse(userStr)
            const id = user.employer_id;
            try {
              const res = await axios.post(API + '/employee', {
                employer_id: id,
                email: emailText,
                full_name: nameText
              })
              // alert("employee added!")
              enqueueSnackbar('Employee invitied', { variant: "success" });
              window.location.reload();
            } catch (e) {
              enqueueSnackbar('Duplicates are not allowed', { variant: "error" });
              window.location.reload();
            }
          }
        }
  return (
    <CompleteHeader>
      <div>
        <SnackbarProvider />
        <Typography variant = "h4">Let's grow your team, invite a new employee!</Typography>
        <Typography variant="subtitle1">Email Address: </Typography>
        <TextField
        label="Work email"
        placeholder="Work email"
        variant="outlined"
        onChange = {(e) => setEmailText(e.target.value)}
        />
        <Typography variant="subtitle1">Name: </Typography>
        <TextField
        label="Full name"
        placeholder="Full name"
        variant="outlined"
        onChange = {(e) => setNameText(e.target.value)}
        />
        <br></br>
        <br></br>
        <Button variant="contained" style={{backgroundColor: "#E66E15"}} onClick = {submit}>Submit</Button>
      </div>
    </CompleteHeader>
  );
};

export default Invite;