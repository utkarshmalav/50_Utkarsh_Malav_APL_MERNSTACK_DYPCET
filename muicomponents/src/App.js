/** @format */

import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Card,
  CardContent,
  Snackbar,
  Alert,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Switch,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#000000";
  }, [darkMode]);

  useEffect(() => {
    document.title = "Todo Buddy";
  }, []);

  const handleAddTask = () => {
    if (!taskName.trim()) {
      setShowWarning(true);
      return;
    }
    setLoading(true);
    setProgress(0);
    setTimeout(() => {
      setProgress(100);
      setLoading(false);
      setTasks([
        ...tasks,
        { name: taskName, completed: false, important: false },
      ]);
      setShowSnackbar(true);
      setMessage("Task added successfully!");
      setTaskName("");
    }, 1000);
  };

  const handleDeleteTask = (index) => {
    if (!toggleEnabled) return;
    setProgress(0);
    setTimeout(() => setProgress(100), 500);
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setShowSnackbar(true);
    setMessage("Task deleted successfully!");
  };

  const handleMarkCompleted = (index) => {
    if (!toggleEnabled) return;
    setProgress(0);
    setTimeout(() => setProgress(100), 500);
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setShowSnackbar(true);
    setMessage("Task marked as completed!");
  };

  const handleMarkImportant = (index) => {
    if (!toggleEnabled) return;
    setProgress(0);
    setTimeout(() => setProgress(100), 500);
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
    setShowSnackbar(true);
    setMessage("Task marked as very important!");
  };

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleTaskInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 40) {
      setTaskName(value);
      if (showWarning && value.trim()) {
        setShowWarning(false);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Todo Buddy
            </Typography>
            <Button color="inherit" onClick={handleOpenDialog}>
              About
            </Button>
            <IconButton
              color="inherit"
              onClick={() => setDarkMode(!darkMode)}
              sx={{ ml: 2 }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <LinearProgress variant="determinate" value={progress} />
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Add Task
                  </Typography>
                  {showWarning && (
                    <Typography color="error" variant="body2">
                      Task cannot be empty!
                    </Typography>
                  )}
                  <TextField
                    label="Task Name (Max 40 letters)"
                    value={taskName}
                    onChange={handleTaskInputChange}
                    onKeyDown={(e) => {
                      if (e.key == 'ENTER') {
                        handleAddTask();
                      }
                    }}
                    fullWidth
                    margin="normal"
                    placeholder="Enter task name"
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTask}
                    startIcon={<AddIcon />}
                  >
                    Add Task
                  </Button>
                  <Box mt={2}>
                    <Typography>Enable Actions</Typography>
                    <Switch
                      checked={toggleEnabled}
                      onChange={() => setToggleEnabled(!toggleEnabled)}
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr. No</TableCell>
                      <TableCell>Task Name</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task, index) => (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor: darkMode
                            ? task.important
                              ? "gray"
                              : "inherit"
                            : task.important
                            ? "orange"
                            : "inherit",
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {task.name}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete Task">
                            <IconButton
                              color="secondary"
                              onClick={() => handleDeleteTask(index)}
                              disabled={!toggleEnabled}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Mark as Done">
                            <IconButton
                              color="primary"
                              onClick={() => handleMarkCompleted(index)}
                              disabled={!toggleEnabled}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Mark as Very Important">
                            <IconButton
                              color="default"
                              onClick={() => handleMarkImportant(index)}
                              disabled={!toggleEnabled}
                            >
                              <StarIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>

        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>About Todo Buddy</DialogTitle>
          <DialogContent>
            <DialogContentText>
              It will help us to keep track of our tasks.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert onClose={() => setShowSnackbar(false)} severity="success">
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
