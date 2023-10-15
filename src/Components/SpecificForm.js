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
import { useNavigate } from "react-router-dom";
import CompleteHeader from "./Header/CompleteHeader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SpecificForm = ({ item }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [relData, setRelData] = useState({});

  useEffect(() => {
    var obj = [
      { name: "work life bal.", value: item.wlb || 0 },
      { name: "overall", value: item.overall || 0 },
      { name: "transparency", value: item.transparency || 0 },
      { name: "culture", value: item.culture || 0 },
    ];
    setRelData(obj);
    console.log(item);
  }, []);

  const handleClose = () => {
    setOpen(false);
    console.log("we haef  ")
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Form Averages</DialogTitle>
      <BarChart width={400} height={300} data={relData}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 7]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#E66E15" />
      </BarChart>
    </Dialog>
  );
};

export default SpecificForm;
