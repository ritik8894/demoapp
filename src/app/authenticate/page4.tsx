"use client";
import React, { useState } from "react";
import TextField from '@mui/material/TextField';

export default function AuthPage() {
  const [Email, setEmail] = useState("");

  return (
    <div className="items-center justify-center h-[50%] w-[50%] m-10">
      <TextField
        error
        id="s"
        label="Floating outlined"
        variant="outlined"
        fullWidth
        value={Email}
        onChange={e => setEmail(e.target.value)}
        InputLabelProps={{ shrink: Email.length > 0 || undefined }}
      />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField
        label="Email/Phone"
        value={Email}
        onChange={e => setEmail(e.target.value)}
        {{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { 
              borderColor: Email ? '#4ade80' : undefined, 
              borderWidth: '1.5px', 
            },
            '&:hover fieldset': {
              borderColor: Email ? '#4ade80' : 'black',  
              borderWidth: '1.5px',
            },
            '&.Mui-focused fieldset': {
              borderColor: Email ? '#4ade80' : '#4ade80', 
              borderWidth: '1.5px',
            },
          },
          '& .MuiInputLabel-root': {
            color: Email ? '#4ade80' : 'black', 
            '&.Mui-focused': {
              color:'#4ade80',
            },
          },
        }}
      />
      <TextField label="Outlined secondary" color="success"  />
    </div>
  );
}