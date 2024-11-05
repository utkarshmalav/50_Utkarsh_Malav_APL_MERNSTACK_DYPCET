import React, { useState } from "react";
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
  Stack,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState(null); 
  const [error, setError] = useState({ age: "", email: "" });
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    let valid = true;
    let newError = { age: "", email: "" };

    if (isNaN(age) || age <= 0 || age >= 100) {
      newError.age = "Invalid Age";
      valid = false;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newError.email = "Invalid email format.";
      valid = false;
    } else if (rows.some((row) => row.email === email)) {
      newError.email = "This email already exists. Try another email.";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const handleNext = () => {
    if (step === 0) {
      if (validateInputs()) {
        setNewRow({ name, age, city, email });
        setStep((prev) => prev + 1);
      }
    } else if (step === 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep((prev) => prev + 1);
      }, 2000);
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);
  const handleReset = () => {
    setName("");
    setAge("");
    setCity("");
    setEmail("");
    setStep(0);
    setError({ age: "", email: "" });
    setNewRow(null);  
  };

  const handleSuccess = () => {
    setRows([...rows, newRow]); 
    handleReset(); 
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Data Form
          </Typography>
        </Toolbar>
      </AppBar>

      <Box p={2}>
        <Stepper activeStep={step}>
          {["Enter Details", "Review Table", "Success"].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {step === 0 && (
          <Box mt={4}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              margin="normal"
              error={!!error.age}
              helperText={error.age}
              type="number"
            />
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              error={!!error.email}
              helperText={error.email}
            />
            <Stack direction="row" spacing={2} mt={2}>
              <Button disabled variant="contained">
                Back
              </Button>
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
            </Stack>
          </Box>
        )}

        {step === 1 && (
          <Box mt={4}>
            {loading ? (
              <Box textAlign="center" mt={4}>
                <CircularProgress />
                <Typography variant="h6" mt={2}>
                  Processing...
                </Typography>
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor: row === newRow ? "#f5f5f5" : "inherit", 
                        }}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.city}</TableCell>
                        <TableCell>{row.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <Stack direction="row" spacing={2} mt={2}>
              <Button onClick={handleBack} variant="contained">
                Back
              </Button>
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
              >
                Next
              </Button>
            </Stack>
          </Box>
        )}

        {step === 2 && !loading && (
          <Box mt={4} textAlign="center">
            <Typography variant="h4" gutterBottom>
              Success!
            </Typography>
            <Typography variant="h6" gutterBottom>
              Your data has been submitted.
            </Typography>
            <Button onClick={handleSuccess} variant="contained" color="primary">
              Go Back
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
