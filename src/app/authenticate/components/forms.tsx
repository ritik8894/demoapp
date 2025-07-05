import {TextField  ,useSxfuncTextField} from "@/components/ui/custom-ui";
import Link from 'next/link';
import { Button, Checkbox } from '@heroui/react';

export interface FormProps {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  Email_Phone: string;
  PhoneNo: string;
  Password: string;
  ReferralCode: string;
  ReferralDisable: boolean;
  AcceptedTerms: boolean;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setEmailAddress: (v: string) => void;
  setEmail_Phone: (v: string) => void;
  setPhoneNo: (v: string) => void;
  setPassword: (v: string) => void;
  setReferralCode: (v: string) => void;
  setAcceptedTerms: (v: boolean) => void;
  isLoading: boolean;
  SubmitForm: (action: string) => void;
  isFormValid: () => boolean;
  updateFormType: (type: 'sign-in' | 'sign-up' | 'forgot-password') => void;
  DynamicType: string;
}

export const SignUpForm = (props: FormProps) => {
  return (
    <div className="h-full">
      <div className="flex-1 flex flex-col justify-center pt-25 pb-5 space-y-5 h-full overflow-y-auto">
        <div className="flex flex-col sm:flex-row w-full gap-3 justify-between">
          <TextField label="First Name" sx={useSxfuncTextField({ input: props.FirstName })} value={props.FirstName} onChange={e => props.setFirstName(e.target.value)}/>
          <TextField label="Last Name" sx={useSxfuncTextField({ input: props.LastName })} value={props.LastName} onChange={e => props.setLastName(e.target.value)}/>
        </div>
        <TextField type="email" label="Email Address" sx={useSxfuncTextField({ input: props.EmailAddress })} value={props.EmailAddress} onChange={e => props.setEmailAddress(e.target.value)} />
        <TextField type={props.PhoneNo ? "phone" :"text"} label="Phone No" sx={useSxfuncTextField({ input: props.PhoneNo, er: false })} value={props.PhoneNo} onChange={e => props.setPhoneNo(e.target.value)} />
        <TextField type="password" verify={false} label="Password" sx={useSxfuncTextField({ input: props.Password, er: false })} value={props.Password} onChange={e => props.setPassword(e.target.value)} />
        <TextField type="text" label="Referral Code (Optional)" sx={useSxfuncTextField({ input: props.ReferralCode, er: false })} value={props.ReferralCode} onChange={e => props.setReferralCode(e.target.value)} disabled={props.ReferralDisable}/>
        {/* Terms */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/80">
          <Checkbox radius="sm" isSelected={props.AcceptedTerms} onValueChange={props.setAcceptedTerms}/>
          <label htmlFor="terms" className="text-xs text-black hover:text-gray dark:text-white dark:hover:text-gray-300 cursor-pointer"> I agree to the</label>
          <Link href="/legal/terms&conditions" target="_blank">
            <span className="underline  hover:text-gray-900 dark:hover:text-white/50 cursor-pointer">Terms & Conditions</span>
          </Link>
        </div>
        <div className="h-[6vh]">
          <Button fullWidth isLoading={props.isLoading} className="h-[6vh] bg-black hover:bg-gray dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-[5px]"  onPress={() => props.SubmitForm('sign-up')} isDisabled={!props.isFormValid()}>
            {props.isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
        <p className="text-sm text-center text-black dark:text-white">
          Already have an account?{' '}
          <span className="cursor-pointer underline text-gray-500 hover:text-black dark:hover:text-white/80" onClick={() => props.updateFormType('sign-in')} >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export const SignInForm = (props: FormProps) => {
  return (
    <div className="h-full">
      <div className="flex-1 flex flex-col justify-center pt-5 pb-5 space-y-5 h-full overflow-y-auto">
        <TextField type={props.DynamicType} label="Email Address/Phone No" sx={useSxfuncTextField({input:props.Email_Phone,er:false})} value={props.Email_Phone} onChange={e => props.setEmail_Phone(e.target.value)} />
        <TextField type="password" verify={false} label="Password" sx={useSxfuncTextField({input:props.Password,er:false})} value={props.Password} onChange={e => props.setPassword(e.target.value)} />
        
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/80">
          <Checkbox radius="sm" isSelected={props.AcceptedTerms} onValueChange={props.setAcceptedTerms} />
          <label htmlFor="terms" className="text-xs text-black hover:text-gray dark:text-white dark:hover:text-gray-300 cursor-pointer">
            I agree to the
          </label>
          <Link href="/legal/terms&conditions" target="_blank">
            <span className="underline  hover:text-gray-900 dark:hover:text-white/50 cursor-pointer" style={{ marginLeft: 2 }}>
              Terms & Conditions
            </span>
          </Link>
        </div>
        <div className="h-[6vh]">
          <Button isLoading={props.isLoading} radius="none" className="h-[6vh] bg-black hover:bg-gray dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-[5px]" fullWidth onPress={() => props.SubmitForm('sign-in')} isDisabled={!props.isFormValid()}>
            {props.isLoading ? 'Signing In...' : 'Sign in'}
          </Button>
        </div>
        <p className="text-sm text-center text-black dark:text-white">
          Forgot your password?{' '}
          <span className="cursor-pointer underline text-gray-500 hover:text-black dark:hover:text-white/80" onClick={() => props.updateFormType('forgot-password')}>
            Reset
          </span>
        </p>
        <p className="text-sm text-center text-black dark:text-white">
          Don`t have an account?{' '}
          <span className="cursor-pointer underline text-gray-500 hover:text-black dark:hover:text-white/80" onClick={() => props.updateFormType('sign-up')}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export const ForgotPasswordForm = (props: FormProps & {NewPass: boolean}) => {
  const sxStyles = useSxfuncTextField({
    input: props.NewPass ? props.Password : props.EmailAddress,
    er: false
  });
  return (
  <div className="flex-1 flex flex-col justify-center space-y-3 h-full overflow-y-auto">
    <TextField type={props.NewPass? "password": "email"}  label={props.NewPass? "New Password": "Email Addres"} sx={sxStyles} value={props.NewPass? props.Password: props.EmailAddress} onChange={e => props.NewPass? props.setPassword(e.target.value) : props.setEmailAddress(e.target.value) } />
    
    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/80">
      <Checkbox radius="sm" isSelected={props.AcceptedTerms} onValueChange={props.setAcceptedTerms} />
      <label htmlFor="terms" className="text-xs text-black hover:text-gray dark:text-white dark:hover:text-gray-300 cursor-pointer">
        I agree to the
      </label>
      <Link href="/legal/terms&conditions" target="_blank">
        <span className="underline  hover:text-gray-900 dark:hover:text-white/50 cursor-pointer" style={{ marginLeft: 2 }}>
          Terms & Conditions
        </span>
      </Link>
    </div>
    <div className="h-[6vh]">
      <Button isLoading={props.isLoading} radius="none" className="h-[6vh] bg-black hover:bg-gray dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-[5px]" fullWidth onPress={() => props.SubmitForm(props.NewPass? 'forgot-password-set-new': 'forgot-password')} isDisabled={!props.isFormValid()}>
        {props.isLoading ? props.NewPass?'Saving New Password...':'Sending Email...': props.NewPass?'Set New Password':'Send reset link'}
      </Button>
    </div>
    <p className="text-sm text-center text-black dark:text-white">
      Remembered it?{' '}
      <span className="cursor-pointer underline text-gray-500 hover:text-black dark:hover:text-white/80" onClick={() => props.updateFormType('sign-in')}>
        Log in
      </span>
    </p>
  </div>
  );
}