import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: number;
  name: string;
  email: string;
  age?: string;
}

function ProfileForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [existingId, setExistingId] = useState<number | null>(null);

  useEffect(() => {
    axios.get<Profile[]>(`${process.env.REACT_APP_API_URL}/profiles`)
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          const latest = data[data.length - 1];
          setForm({
            name: latest.name,
            email: latest.email,
            age: latest.age || "",
          });
          setExistingId(latest.id);
        }
      })
      .catch(() => {
        console.warn("No existing profile found.");
      });
  }, []);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", age: "" };

    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      valid = false;
    }

    if (!form.email || !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (form.age && isNaN(Number(form.age))) {
      newErrors.age = "Age must be a number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (existingId) {
          await axios.put(`${process.env.REACT_APP_API_URL}/profiles/${existingId}`, form);
        } else {
          await axios.post(`${process.env.REACT_APP_API_URL}/profiles`, form);
        }
        navigate("/profile");
      } catch (error) {
        alert("Failed to save profile");
        console.error(error);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center">
        {existingId ? "Edit Profile" : "Profile Form"}
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />

      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <TextField
        label="Age"
        name="age"
        value={form.age}
        onChange={handleChange}
        error={!!errors.age}
        helperText={errors.age}
        fullWidth
      />

      <Button type="submit" variant="contained" fullWidth>
        {existingId ? "Update Profile" : "Submit"}
      </Button>
    </Box>
  );
}

export default ProfileForm;
