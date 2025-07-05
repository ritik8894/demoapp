import { useRef,useState, useEffect} from 'react';
import { useTheme } from 'next-themes';
import {IconButton, InputAdornment, Typography, Box, TextField as TF} from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { MuiTelInput } from 'mui-tel-input';

import {Visibility, VisibilityOff} from '@mui/icons-material';
import { Shield ,ShieldCheck, ShieldAlert, Mail, KeyRound} from 'lucide-react';

import clsx from 'clsx';


export function useSxfuncTextField({input, er = false} : {input?: string, er?: boolean}) {
    const { resolvedTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        setIsDark(resolvedTheme === 'dark');
    }, [resolvedTheme]);

    return {
        mb: 1.25,
        '& .MuiOutlinedInput-root': { 
            borderRadius: '5px',
            color: isDark ? '#ffffff' : '#000000',
            '& fieldset': { 
            borderColor: er ? '#ff0000' : input ? '#00b31e' : isDark ? 'rgba(255,255,255,0.5)' :undefined, 
            borderWidth: '1px', 
            },
            '&:hover fieldset': {
            borderColor: er ? '#ff0000' : input ? '#00b31e' : isDark ? 'white' :'black',  
            borderWidth: '1px',
            },
            '&.Mui-focused fieldset': {
            borderColor: er ? '#ff0000' : input ? '#00b31e' : '#00b31e', 
            borderWidth: '1px',
            },
        },
        '& .MuiInputLabel-root': {
            color: er ? '#ff0000' : input ? '#00b31e' :  isDark ? 'white' :'black', 
            '&.Mui-focused': {
            color: er ? '#ff0000' : '#00b31e',
            },
        },}
};



const PasswordField = (props: TextFieldProps & { verify?: boolean }) => {
  const { verify, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFocus = () => {
    setFocused(true);
    setShowChecklist(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const validatePassword = (pwd: string) => {
    return {
      length: pwd.length >= 6,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    };
  };

  const handleVerify = () => {
    setSubmitted(true);
      const criteria = validatePassword(typeof rest.value === 'string' ? rest.value : '');
    const isValid = Object.values(criteria).every(Boolean);
    if (!isValid) {
      setShowChecklist(true);
    } else {
      setShowChecklist(false);
    }
  };

  const criteria = validatePassword(typeof rest.value === 'string' ? rest.value : '');

  useEffect(() => {
    if (verify) {
        handleVerify();
    }
  }, [verify, rest.value]);

  return ( 

    <Box >
        <TF
        label="Password"
        type={showPassword ? 'text' : 'password'}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        fullWidth
        InputProps={{
            endAdornment: (focused || !!rest.value) && (
            <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff fontSize="inherit" className="text-black dark:text-white"/> : <Visibility fontSize="inherit" className="text-black dark:text-white" />}
                </IconButton>
            </InputAdornment>
            ),
            startAdornment: (focused || !!rest.value) && (
                <InputAdornment position="end">
                    <IconButton edge="start">
                    <KeyRound fontSize="inherit" className="text-black dark:text-white"/>
                    </IconButton>
                </InputAdornment>
            ),
        }}
        />

        {showChecklist && (focused || submitted) && (
        <Box className="mt-2 p-4 border rounded-lg shadow-sm bg-white dark:bg-black/80 space-y-2">
            {([
            { key: 'length', text: 'At least 6 characters' },
            { key: 'upper', text: 'At least one uppercase letter' },
            { key: 'lower', text: 'At least one lowercase letter' },
            { key: 'number', text: 'At least one number' },
            { key: 'special', text: 'At least one special character' },
            ] as { key: keyof typeof criteria; text: string }[]).map(({ key, text }) => {
            const isValid = criteria[key];
            const isError = submitted && !isValid;

            return (
                <Box key={key} display="flex" alignItems="center" gap={1}>
                {isValid ? (
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                ) : isError ? (
                    <ShieldAlert className={clsx(
                    'w-5 h-5',
                    'text-red-500'
                    )} />
                ): (
                    <Shield className={clsx(
                    'w-5 h-5',
                    'text-gray-400',
                    'dark:text-white'
                    )} />
                )}
                <Typography
                    variant="body2"
                    className={clsx(
                    isValid ? 'text-green-600 ' : isError ? 'text-red-500' : 'text-gray-600 dark:text-gray-100'
                    )}
                >
                    {text}
                </Typography>
                </Box>
            );
            })}
        </Box>
        )}
    </Box>
  );
};


export const TextField = (props: TextFieldProps & { type?: string } & { verify?: boolean }) => {
    var { type, ...rest } = props;
    type = type?.toLowerCase();
    const validTypes = [
        'email', 'password', 'number', 'tel', 'text', 'search', 'url', 'date',
        'time', 'datetime-local', 'month', 'week', 'color', 'file'
    ];
    const inputRef = useRef<HTMLInputElement>(null);

    // Add focused state for handling adornment visibility
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        inputRef.current?.focus();
    }, [type]);

    if (type === 'email') {
        return (
            <TF
                InputProps={{
                    startAdornment: (focused || !!rest.value) && (
                    <InputAdornment position="end">
                        <IconButton edge="start">
                        <Mail fontSize="inherit" className="text-black dark:text-white"/>
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                {...rest}
                onFocus={(e) => {
                    setFocused(true);
                    if (rest.onFocus) rest.onFocus(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                    if (rest.onBlur) rest.onBlur(e);
                }}
                type={validTypes.includes(type ?? '') ? type : undefined}
            />
        );
    }
    else if (type === 'phone') {
        // Adapt onChange to match MuiTelInput's signature
        const { onChange, value, ...muiTelRest } = rest;
        return (
            <MuiTelInput
                className='text-black dark:text-white'
                inputRef={inputRef}
                {...muiTelRest}
                value={value as string}
                onChange={(val, info) => {
                    if (typeof onChange === 'function') {
                        const event = {
                            target: { value: val }
                        } as React.ChangeEvent<HTMLInputElement>;
                        onChange(event);
                    }
                }}
                defaultCountry="IN"
                forceCallingCode
                focusOnSelectCountry
                preferredCountries={['IN', 'FR']}
            />
        );
    }
    else if (type === 'password') {
        return (
            <PasswordField {...rest}/>
        );
    }
    else {  
        return (
            <TF 
                {...rest}
                type={validTypes.includes(type ?? '') ? type : undefined}
            />
     );
    }
};
