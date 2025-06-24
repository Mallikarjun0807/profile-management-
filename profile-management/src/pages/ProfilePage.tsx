import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Profile {
  id: number;
  name: string;
  email: string;
  age?: string;
}

function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<Profile[]>("http://localhost:5000/profiles")
      .then(res => {
        const data = res.data;
        if (data.length > 0) {
          setProfile(data[data.length - 1]); // latest profile
        }
      })
      .catch(() => {
        alert("Failed to load profile.");
      });
  }, []);

  const handleEdit = () => {
    navigate("/profile-form");
  };

  const handleDelete = () => {
    if (profile) {
      axios.delete(`http://localhost:5000/profiles/${profile.id}`)
        .then(() => {
          setProfile(null);
        })
        .catch(() => {
          alert("Failed to delete profile.");
        });
    }
  };

  if (!profile) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        No profile found. Please fill the form.
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Profile Details
      </Typography>

      <Box mb={2}>
        <Typography><strong>Name:</strong> {profile.name}</Typography>
        <Typography><strong>Email:</strong> {profile.email}</Typography>
        {profile.age && (
          <Typography><strong>Age:</strong> {profile.age}</Typography>
        )}
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </Paper>
  );
}

export default ProfilePage;
