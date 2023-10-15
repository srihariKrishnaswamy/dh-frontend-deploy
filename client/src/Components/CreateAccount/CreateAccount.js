import { React, useState } from "react";
import CompleteHeader from "../Header/CompleteHeader";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  InputLabel,
  NativeSelect,
  FormControl,
  Grid,
  InputAdornment,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Add from "@mui/icons-material/Add";
import axios from 'axios';

const API = "https://dh-backend-fr-fd4331759334.herokuapp.com"

const CreateAccount = () => {
  const [employer_name, set_employer_name] = useState("");
  const [passcode, set_passcode] = useState("");
  const [email, set_email] = useState("");
  const [size, set_size] = useState(0);
  const [industry, set_industry] = useState("");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    // navigate('/createacct');
    window.location.reload();
  };
  const goLogin = () => {
    navigate('/');
  }

  const onSubmit = async () => {
    try {
        const res = await axios.post(API + '/employer', {
            employer_name: employer_name,
            passcode: passcode,
            email: email,
            size: size,
            industry: industry,
            categories: ""
        })
        set_employer_name("")
        set_passcode("")
        set_email("")
        set_size("")
        set_industry("")
        navigate("/")
    } catch (e) {
        alert("duplicate email")
    }
    console.log("account created");

  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={() => {}}>
          <TextField
            autoFocus
            margin="dense"
            id="formtitle"
            label="Employer Name"
            type="text"
            fullWidth
            value={employer_name}
            onChange={(e) => {
              set_employer_name(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="formtitle"
            label="Password"
            type="password"
            fullWidth
            value={passcode}
            onChange={(e) => {
              set_passcode(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="formtitle"
            label="Email"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => {
              set_email(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="formtitle"
            label="Size"
            type="number"
            fullWidth
            value={size}
            onChange={(e) => {
              set_size(e.target.value);
            }}
          />
            <TextField
            autoFocus
            margin="dense"
            id="formtitle"
            label="Industry"
            type="text"
            fullWidth
            value={industry}
            onChange={(e) => {
              set_industry(e.target.value);
            }}
          />
          <DialogActions>
            <Button onClick={goLogin}>Log In</Button>
            <Button onClick={onSubmit}>Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccount;
