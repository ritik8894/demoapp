// "use client";
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// export default function ForgotPassword() {
//   const [email, setEmail] = React.useState('');
//   const isDisabled = email.trim() === "";

//   const handleBack = () => {
//     // handle back navigation
//   };

//   const handleNext = () => {
//     // handle forgot password logic
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         bgcolor: 'background.paper',
//         display: 'flex',
//         flexDirection: 'column',
//         px: 2,
//         pt: 3,
//       }}
//     >
//       <IconButton
//         onClick={handleBack}
//         sx={{ alignSelf: 'flex-start', mb: 2 }}
//         aria-label="back"
//       >
//         <ArrowBackIosNewIcon />
//       </IconButton>
//       <h2 style={{ fontWeight: 600, fontSize: 28, marginBottom: 16 }}>Forgot password?</h2>
//       <TextField
//         label="Email/Phone"
//         variant="outlined"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         fullWidth
//         sx={{
//           mb: 3,
//           '& .MuiOutlinedInput-root': {
//             borderRadius: '12px',
//             background: '#fff',
//             '& fieldset': {
//               borderColor: 'black',
//               borderWidth: 2,
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#22c55e',
//               borderWidth: 2,
//             },
//           },
//           '& .MuiInputLabel-root': {
//             color: 'black',
//           },
//           // '& .MuiInputLabel-root': {
//           //   color: '#22c55e',
//           // },
//         }}
//         InputLabelProps={{
//           style: { color: '#22c55e' },
//         }}
//         InputProps={{
//           style: { color: 'black', fontWeight: 500 },
//           endAdornment: email && (
//             <IconButton
//               size="small"
//               onClick={() => setEmail('')}
//               aria-label="clear"
//               edge="end"
//             >
//               <span style={{ fontSize: 25, color: '#888' }}>×</span>
//             </IconButton>
//           ),
//         }}
//       />
//       <button
//         onClick={handleNext}
//         disabled={isDisabled}
//         className={`w-full rounded-full py-3 text-lg font-semibold mt-2 transition-colors bg-black text-white
//           ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
//         `}
//         style={{ marginTop: 16 }}
//       >
//         Next
//       </button>
//     </Box>
//   );
// }



// import { Button , Input } from "@/components/ui/material-tailwind";

// import { Button } from "@material-tailwind/react";
// export default function ForgotPassword() {
//   return (
//     <div>
//       hello world 
//       <Button>
//         Hello
//       </Button>
//     </div>
//   );
// }


// export default function Example() {

//   return (
//     <div>
//       <Button color="blue">Click Me</Button>
//       <Button color="black">Click Me</Button>
//       <Input className="w-0.5" color="teal" label="Input Teal" />
//     </div>
//   );
// }
"use client";
import * as React from "react";
import { Box, Field, Input, defineStyle } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Field.Root>
      <Box pos="relative" w="full">
        <Input className="peer" placeholder="" />
        <Field.Label css={floatingStyles}>Email</Field.Label>
      </Box>
    </Field.Root>
  )
}

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "green.500",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "green.500",
    top: "-3",
    insetStart: "2",
  },
})


export default Demo;