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
import { ListItem } from "@mui/material";
import { List } from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";
import SpecificForm from "./SpecificForm";
import { getCompanyAverages } from "../Actions/Actions";
import CompleteHeader from "./Header/CompleteHeader";

const ViewForms = () => {
  const [averages, setAverages] = useState([]);
  const [openForm, setOpenForm] = useState(null);

  useEffect(() => {
    (async () => {
      var userStr = localStorage.getItem("user");

      var user = JSON.parse(userStr);
      const id = user.employer_id;
      const res = await getCompanyAverages(id);
      setAverages(res);
      console.log(res);
    })();
  }, []);

  const handleClick = (form_id) => {
    const dataWithName = averages.find((item) => item.form_id === form_id);
    setOpenForm(dataWithName);
  };
  // const reversed = averages.slice().reverse();

  // setAverages(reversed)
  return (
    <CompleteHeader>
      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        p={2}
        bgcolor="lightgrey"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">View Forms</Typography>
      </Box>
      <Box display="flex" justifyContent="center" width="100%">
        <List
          component="nav"
          aria-label="main mailbox folders"
          style={{ width: "100%", overflow: "auto" }}
        >
          {averages.slice().reverse().map((item) => (
            <ListItem
              key={item.name}
              onClick={() => handleClick(item.form_id)}
              style={{
                width: "100%",
                backgroundColor: "#E66E15",
                border: "1px solid #e0e0e0",
                margin: 10,
                padding: 10,
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              Name: {item.title}, Date: {item.curr_date.slice(0, 10)}
            </ListItem>
          ))}
        </List>
        {openForm && <SpecificForm item={openForm} />}
      </Box>
    </Box>

    </CompleteHeader>
    
  );
};

export default ViewForms;
