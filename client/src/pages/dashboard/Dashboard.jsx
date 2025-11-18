import React from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { LogoutApi } from "../../api/userAuth/invokeLogout.api";
import useUserStore from "../../context/userStore";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';

export default function Dashboard() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await LogoutApi(navigate);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome,{" "}
          <Box component="span" sx={{ color: "#850E35", textTransform: "uppercase" }}>
            {user?.username || "USER"}
          </Box>

        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
            color: "#850E35",
          }}
        >
          <EmailIcon sx={{ mr: 1 }} />
          <Typography variant="body1">{user?.email || "Not available"}</Typography>
        </Box>


        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ px: 4, py: 1.5, fontWeight: 600 }}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
}
