import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Card, CardContent, Typography, Stack, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../../api/userAuth/invokeLogin.api';

export default function Login() {
  const navigate = useNavigate()
  const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    const response = await LoginApi(data, navigate);  
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
    >
      <Card sx={{ width: '100%', p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <Typography align="center" variant="body2">
              Don't have an account? <Link href="/register">Register</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
