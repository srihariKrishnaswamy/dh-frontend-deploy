import React from "react";
import { useState, useEffect } from "react";
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
import CompleteHeader from "../Header/CompleteHeader";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = "https://dh-backend-fr-fd4331759334.herokuapp.com"
const Login = (props) => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    useEffect(() => {
        if (!open) {
            window.location.reload();
        }
      }, [open])

      const handleClose = () => {
        setOpen(false);
        window.location.reload();
      };

    const goSignup = () => {
      navigate('/createacct')
    }
    const doLogin = async () => {
        // var email = email.toLowerCase();
        try {
            const res = await axios.post(API + "/auth", {
                email: email,
                password: password
            })
            const accessToken = res.data.accessToken;
            localStorage.setItem("access_token", accessToken);
            console.log(accessToken);
            const getUserRes = await axios.get(API + `/employer?email=${email}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            localStorage.setItem("user", JSON.stringify(getUserRes.data))
            console.log("user is logged in")
            navigate("/invite")
        } catch (e) {
            console.log(e)
            alert("invalid credentials")
        }
        setEmail("")
        setPassword("")
    }
    

  return (

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Company Log In</DialogTitle>
        <DialogContent>
          <form onSubmit={() => {}}>
            <TextField
              autoFocus
              margin="dense"
              id="formtitle"
              label="Email"
              type="text"
              fullWidth
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="formtitle"
              label="Password"
              type="text"
              fullWidth
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />

            <DialogActions>
              <Button onClick={goSignup}>Sign Up</Button>
              <Button onClick={doLogin}>Login</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
  )
}

export default Login