
import {styles , Links } from './styles';
import {TextField  ,sxfuncTextField} from "@/components/ui/custom-ui";
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const FormButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {isLoading?: boolean; disabled?: boolean;}> = ({ children, isLoading = false, disabled, ...props }) => (
    <Button
      {...props}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      aria-disabled={isLoading || disabled}
      className={`relative overflow-hidden ${props.className ?? ''}`}
    >
      {isLoading && (
        <span className="absolute inset-0 z-1 flex items-center justify-center space-x-2 bg-black backdrop-blur-sm pointer-events-none">
          <span className="h-2 w-2 rounded-full bg-white animate-[bounce_0.7s_infinite_0.1s]" />
          <span className="h-2 w-2 rounded-full bg-white animate-[bounce_0.7s_infinite_0.2s]" />
          <span className="h-2 w-2 rounded-full bg-white animate-[bounce_0.7s_infinite_0.3s]" />
          <span className="h-2 w-2 rounded-full bg-white animate-[bounce_0.7s_infinite_0.4s]" />
        </span>
      )}
      <span className={isLoading ? "relative z-20 opacity-50" : "relative z-2"}>
        {children}
      </span>
    </Button>
);

export interface FormProps {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  Email_Phone: string;
  PhoneNo: string;
  Password: string;
  AcceptedTerms: boolean;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setEmailAddress: (v: string) => void;
  setEmail_Phone: (v: string) => void;
  setPhoneNo: (v: string) => void;
  setPassword: (v: string) => void;
  setAcceptedTerms: (v: boolean) => void;
  isLoading: boolean;
  SubmitForm: (action: string) => void;
  isFormValid: () => boolean;
  updateFormType: (type: 'sign-in' | 'sign-up' | 'forgot-password') => void;
  DynamicType: string;
}


export const SignUpForm = (props: FormProps) => {
  return (
    <div className={styles.FormContainer}>
      <div className={styles.InputRow}>
        <TextField label="First Name" sx={sxfuncTextField({input:props.FirstName})} value={props.FirstName} onChange={e => props.setFirstName(e.target.value)} />
        <TextField label="Last Name" sx={sxfuncTextField({input:props.LastName})} value={props.LastName} onChange={e => props.setLastName(e.target.value)} />
      </div>
      <TextField type="email" label="Email Address" sx={sxfuncTextField({input:props.EmailAddress})} value={props.EmailAddress} onChange={e => props.setEmailAddress(e.target.value)} />
      <TextField type={props.PhoneNo ? "phone" : "text"} label="Phone No" sx={sxfuncTextField({input:props.PhoneNo,er:false})} value={props.PhoneNo} onChange={e => props.setPhoneNo(e.target.value)} />
      <TextField type="password" verify={false} label="Password" sx={sxfuncTextField({input:props.Password,er:false})} value={props.Password} onChange={e => props.setPassword(e.target.value)} />
      <div className={styles.CheckBox}>
        <Checkbox id="terms" checked={props.AcceptedTerms} onCheckedChange={checked => props.setAcceptedTerms(checked === true)} />
        <label htmlFor="terms" className={styles.Link}>
          I agree to the
        </label>
        <Link href={Links.Terms} target="_blank">
          <span className={styles.CheckBoxLabel} style={{ marginLeft: 4 }}>
            Terms & Conditions
          </span>
        </Link>
      </div>
      <FormButton className={styles.Button} isLoading={props.isLoading} onClick={() => props.SubmitForm('sign-up')} disabled={!props.isFormValid()}>
        {props.isLoading ? 'Creating Account...' : 'Create Account'}
      </FormButton>
      <p className={styles.Text}>
        Already have an account?{' '}
        <span className={styles.Link} onClick={() => props.updateFormType('sign-in')}>
          Log in
        </span>
      </p>
    </div>
  );
}

export const SignInForm = (props: FormProps) => {
  return (
    <div className={styles.FormContainer}>
      <TextField type={props.DynamicType} label="Email Address/Phone No" sx={sxfuncTextField({input:props.Email_Phone,er:false})} value={props.Email_Phone} onChange={e => props.setEmail_Phone(e.target.value)} />
      <TextField type="password" verify={false} label="Password" sx={sxfuncTextField({input:props.Password,er:false})} value={props.Password} onChange={e => props.setPassword(e.target.value)} />
      <div className={styles.CheckBox}>
        <Checkbox id="terms" checked={props.AcceptedTerms} onCheckedChange={checked => props.setAcceptedTerms(checked === true)} />
        <label htmlFor="terms" className={styles.Link}>
          I agree to the
        </label>
        <Link href={Links.Terms} target="_blank">
          <span className={styles.CheckBoxLabel} style={{ marginLeft: 4 }}>
            Terms & Conditions
          </span>
        </Link>
      </div>
      <FormButton className={styles.Button} isLoading={props.isLoading} onClick={() => props.SubmitForm('sign-in')} disabled={!props.isFormValid()}>
        {props.isLoading ? 'Signing In...' : 'Sign in'}
      </FormButton>
      <p className={styles.Text}>
        Forgot your password?{' '}
        <span className={styles.Link} onClick={() => props.updateFormType('forgot-password')}>
          Reset
        </span>
      </p>
      <p className={styles.Text}>
        Don't have an account?{' '}
        <span className={styles.Link} onClick={() => props.updateFormType('sign-up')}>
          Sign up
        </span>
      </p>
    </div>
  );
}

export const ForgotPasswordForm = (props: FormProps,NewPass: boolean) => {
  return (
  <div className={styles.FormContainer}>
    <TextField type={NewPass? "password": props.DynamicType}  label={NewPass? "New Password": "Email Address/Phone No"} sx={sxfuncTextField(NewPass? {input:props.Password,er:false} :{input:props.Email_Phone})} value={NewPass? props.Password: props.Email_Phone} onChange={e => NewPass? props.setPassword(e.target.value): props.setEmail_Phone(e.target.value)} />
    {NewPass ?
     <Link href={"/authenticate?type=forgot-password"} className={styles.Text} style={{ marginTop: 10 }}>
        <span className={styles.CheckBoxLabel} style={{ marginLeft: 4 }}>
          Make a Fresh Request
        </span>
      </Link>
      : null
    }
    <div className={styles.CheckBox}>
      <Checkbox id="terms" checked={props.AcceptedTerms} onCheckedChange={checked => props.setAcceptedTerms(checked === true)} />
      <label htmlFor="terms" className={styles.Link}>
        I agree to the
      </label>
      <Link href={Links.Terms} target="_blank">
        <span className={styles.CheckBoxLabel} style={{ marginLeft: 4 }}>
          Terms & Conditions
        </span>
      </Link>
    </div>
    <FormButton className={styles.Button} isLoading={props.isLoading} onClick={() => props.SubmitForm(NewPass? 'forgot-password-set-new': 'forgot-password')} disabled={!props.isFormValid()}>
      {props.isLoading ? NewPass?'Saving New Password...':'Sending Email...': NewPass?'Set New Password':'Send reset link'}
    </FormButton>
    <p className={styles.Text}>
      Remembered it?{' '}
      <span className={styles.Link} onClick={() => props.updateFormType('sign-in')}>
        Log in
      </span>
    </p>
  </div>
  );
}