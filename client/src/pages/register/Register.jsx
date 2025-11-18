import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Card, CardContent, Typography, Stack, TextField, Button, Link } from '@mui/material';
import { RegisterApi } from '../../api/userAuth/invokeRegister.api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate()
  const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    const response = await RegisterApi(data, navigate);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
    >
      <Card sx={{ width: '100%', p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />

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
              {isSubmitting ? "Submitting..." : "Register"}
            </Button>

            <Typography align="center" variant="body2">
              Already signed up? <Link href="/login">Login</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
