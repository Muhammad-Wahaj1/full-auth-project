import React from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ResetApi } from "../../api/userAuth/invokeResetPassword.api";

export default function ResetPassword() {
  const navigate = useNavigate()
  const { token } = useParams();

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async(data) => {
    const { password } = data;
    console.log("Reset password request:---","Passowrd:", password, "Token:", token);
    const response =  await ResetApi({password}, token, navigate);
  };

  const passwordValue = watch("password");

  const inputSX = {
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: '#850E35',
    },
    '& .MuiInputLabel-root.MuiFormLabel-root': {
      color: '#666',
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
    >
      <Card sx={{ width: "100%", p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Reset Password
          </Typography>

          <Typography variant="body2" align="center" sx={{ mb: 3, color: "gray" }}>
            Enter your new password below.
          </Typography>

          <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters required" },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="New Password"
                  type="password"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={inputSX}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={inputSX}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "#850E35",
                "&:hover": { background: "#A01045" },
              }}
            >
              Reset Password
            </Button>

          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
