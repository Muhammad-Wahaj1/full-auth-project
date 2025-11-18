import React from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ForgotApi } from "../../api/userAuth/invokeForgotpassword.api";

export default function ForgotPassword() {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: "",
        },
    });

    const inputSX = {
        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: '#850E35',
        },
        '& .MuiInputLabel-root.MuiFormLabel-root': {
            color: '#666',
        }
    };

    const onSubmit = async(data) => {
        console.log("Forgot password request:", data);
        const response = await ForgotApi(data)
    };

    return (
        <Container
            maxWidth="sm"
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
        >
            <Card sx={{ width: "100%", p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Forgot Password
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ mb: 3, color: "gray" }}>
                        Enter your email to receive a password reset link.
                    </Typography>

                    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "Email is required" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Registered Email"
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={inputSX}
                                />
                            )}
                        />

                        <Button type="submit" variant="contained" fullWidth sx={{ background: "#850E35" }}>
                            Send Reset Link
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
}
