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
import CompleteHeader from "./Header/CompleteHeader";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

// import dotenv from 'dotenv'
// dotenv.config()
import axios from "axios";

const API = "https://dh-backend-fr-fd4331759334.herokuapp.com";

const CreateForm = () => {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      navigate("/dashboard");
    }
  }, [open]);

  const handleOptionChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/dashboard");
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleQuestionTitle = (event) => {
    setQuestionTitle(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleQuestion = () => {
    if (title === "" || description === "" || questionTitle === "" || category === "") {
      enqueueSnackbar('Blank entries are not allowed', { variant: "error" });
      return;
    }
    const object = { question: questionTitle, questionCategory: category };

    //  console.log(object)
    setQuestion([...question, object]);
    setQuestionTitle("");
    setCategory("");
    console.log(question);
    //  console.log(question);
  };

  const sendEmail = async (form_id) => {
    // "/employee/:formID/:employeeID"
    var apiKey = await axios.get('https://api-key-getter.onrender.com/');
    apiKey = apiKey.data.key
    console.log('apiKey: ' + apiKey)
    const brevoApiEndpoint = 'https://api.sendinblue.com/v3/smtp/email';
    var userStr = localStorage.getItem("user");
    var user = JSON.parse(userStr);
    const pplToSend = await axios.get(API + '/employer/employees?employer_id=' + user.employer_id)
    var ppl = pplToSend.data;
    var fin = []
    for (let person of ppl) {
      let obj = {email: person.email, name: person.full_name, id: person.employee_id}
      fin.push(obj);
    }
    console.log(fin);
    for (let person of fin) {
      const emailPayload = {
        sender: {
          email: 'claritydonotreply@gmail.com',
          name: user.employer_name,
        },
        to: [
          {
            email: person.email,
            name: person.full_name,
          },
        ],
        subject: 'Clarity: New Form!',
        textContent: 'link here',
        htmlContent: `<h5>Your Clarity Form Link! Fill it out here: ${`http://localhost:3000/employee/` + form_id + '/' + person.id}</h5>`, // i wanna send out a different link to each person in the list
      };
      console.log("payload declared")
      try {
        const response = await axios.post(brevoApiEndpoint, emailPayload, {
          headers: {
            'api-key': apiKey,
          },
        });
    
        console.log('Email sent successfully:', response.data);
      } catch (error) {
        console.error('Failed to send email:', error.response.data);
        return;
      }
    }
    enqueueSnackbar('Emails sent', { variant: "success" });
  }

  const handleSubmit = async (event) => {
    // handleQuestion();
    event.preventDefault();
    if (title === "" || description === "" || question.length === 0) {
      enqueueSnackbar('Blank entries are not allowed', { variant: "error" });
      return
    }
    var userStr = localStorage.getItem("user");
    var user = JSON.parse(userStr);

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const mysqlDate = `${year}-${month}-${day}`;

    console.log(mysqlDate); // This will print today's date in MySQL date format

    const res = await axios.post(API + "/form", {
      title: title,
      curr_date: mysqlDate,
      form_description: description,
      employer_id: user.employer_id,
      questions: question,
    });
    try {
      const id = res.data.form_id;
      await sendEmail(id)
    } catch (e) {
      console.log(e.message);
    }

    // alert("form sent!")
    // use email API to send to all employees
    navigate('/dashboard');
  };

  return (
    <CompleteHeader>
      <SnackbarProvider />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="formtitle"
              label="Form Title"
              type="text"
              fullWidth
              value={title}
              onChange={handleTitle}
            />
            <TextField
              autoFocus
              margin="dense"
              id="formtitle"
              label="Form Description"
              type="text"
              fullWidth
              value={description}
              onChange={handleDescription}
            />
            <TextField
              autoFocus
              margin="dense"
              id="formtitle"
              label="Question"
              type="text"
              fullWidth
              value={questionTitle}
              onChange={handleQuestionTitle}
            />
            <Select
              autoFocus
              margin="dense"
              labelId="Category"
              id="category"
              value={category}
              onChange={handleCategory}
              fullWidth
            >
              <MenuItem value="wlb">Work-Life Balance</MenuItem>
              <MenuItem value="transparency">Transparency</MenuItem>
              <MenuItem value="culture">Culture</MenuItem>
              <MenuItem value="overall">Overall</MenuItem>
            </Select>

            <DialogActions>
              <Button onClick={handleQuestion}>
                <Add />
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </CompleteHeader>
  );
};

export default CreateForm;
