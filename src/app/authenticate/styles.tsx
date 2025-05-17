const theme = {
BaseColor: "bg-white",
// BaseColor: "bg-[#f0f2f5]",

};

const styles = {

// MainPage
MainContainer:`h-[100vh] flex items-center justify-center ${theme.BaseColor} backdrop-blur-md transition-all duration-500 ease-in-out `,


//Authentication Container
AuthContainer: 'h-full w-full lg:h-[95vh] lg:w-[75vw] flex flex-col justify-center md:flex-row sm:rounded-2xl overflow-hidden w-full bg-white transition-all duration-500 ease-in-out shadow-[12px_12px_24px_#c8ccd1,_-12px_-12px_24px_#ffffff]',


//Authentication Container Left Side
AuthContainer_LeftSection_Container:"hidden md:block w-full md:w-1/2 relative transition-all duration-500 ease-in-out",
AuthContainer_LeftSection_Container_Image_Container:"absolute inset-0  transition-all duration-500 ease-in-out",
AuthContainer_LeftSection_Container_Image_Container_Image:"absolute m-2 sm:m-3 md:m-4 rounded-2xl inset-0 bg-[url('/Assets/Authenticate/Authenticate_BG.png')] bg-cover bg-center transition-all duration-500 ease-in-out",
AuthContainer_LeftSection_Container_Image_Container_Header_Footer_Container:"relative h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 transition-all duration-500 ease-in-out",
AuthContainer_LeftSection_Container_Image_Container_Header:"flex justify-end transition-all duration-500 ease-in-out", 
AuthContainer_LeftSection_Container_Image_Container_Footer:"flex justify-center transition-all duration-500 ease-in-out",
AuthContainer_LeftSection_Container_Image_Container_Footer_Description:"text-xl sm:text-2xl md:text-3xl font-bold text-center bg-white text-transparent bg-clip-text leading-snug transition-all duration-500 ease-in-out",


//Authentication Container Right Side
AuthContainer_RightSection_Container: 'w-full md:w-1/2 flex flex-col bg-white pb-4 pt-4 justify-center transition-all duration-500 ease-in-out overflow-hidden',
AuthContainer_RightSection_Container_Header: 'flex flex-col justify-center items-center mt-4 mb-2 transition-all duration-500 ease-in-out',
AuthContainer_RightSection_Container_Title: 'text-4xl font-semibold text-black text-center mb-2 transition-all duration-500 ease-in-out',
AuthContainer_RightSection_Container_Description: 'text-sm text-gray-700 text-center transition-all duration-500 ease-in-out',
AuthContainer_RightSection_Container_AuthForm:"flex-1 flex items-center transition-all duration-500 ease-in-out",
AuthContainer_RightSection_Container_AuthForm_Card:"bg-transparent border-none shadow-none w-full transition-all duration-500 ease-in-out",
AuthContainer_RightSection_Container_AuthForm_CardHeader:"space-y-3 transition-all duration-500 ease-in-out",

    //Authentication Form
FormContainer: 'flex-1 flex flex-col justify-center space-y-5 pt-2 pb-2 sm:px-6 max-h-[60vh] transition-all duration-500 ease-in-out overflow-y-auto',


//Social Section
socialSection: 'mt-4 p-4 border-t border-gray-200 transition-all duration-500 ease-in-out',
socialSection_Buttons: 'flex flex-col md:flex-row items-center justify-center gap-3 transition-all duration-500 ease-in-out pt-4',
socialSection_Button: 'w-full md:w-[45%] h-12 rounded-[5px] border-black border text-base bg-black text-white hover:bg-white hover:text-black hover:border-black text-white transition-all flex items-center justify-center',
socialSection_ButtonStyle:"mr-2 text-base transition-all duration-500 ease-in-out",


//Verification Container
VerificationContainer_MainContainer:"absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center z-50",
VerificationContainer:"bg-[#f0f2f5] p-6 rounded-xl shadow-[12px_12px_24px_#c8ccd1,_-12px_-12px_24px_#ffffff] w-96 max-w-[90vw]",
VerificationContainer_Child:"flex items-center mb-4",
VerificationContainer_Header:"text-xl font-bold text-gray-700",
VerificationContainer_Status_div:"ml-auto flex items-center space-x-2",
VerificationContainer_Status_Idicator:"w-2 h-2 rounded-full",
VerificationContainer_Description : "mb-5 text-gray-600",
VerificationContainer_Input_Container: "flex justify-between mb-6",
VerificationContainer_Input: "w-12 h-12 text-center text-xl bg-[#f0f2f5] text-gray-700 rounded-lg border-none shadow-[inset_4px_4px_8px_#c8ccd1,_inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-200",
VerificationContainer_Success_Div: "absolute inset-0 flex items-center justify-center",
VerificationContainer_Success_Div_Div: "bg-[#f0f2f5] p-6 rounded-xl shadow-[12px_12px_24px_#c8ccd1,_-12px_-12px_24px_#ffffff] text-center transition-transform duration-500 scale-110",
VerificationContainer_Success_Div_Message: "text-2xl font-bold text-green-600",

//Common
Link: 'text-gray hover:text-black transition-all duration-500 ease-in-out cursor-pointer text-xs',
Text:"text-xs text-center text-gray-600",
CheckBox: 'flex items-center gap-2 text-gray-500 text-xs transition-all duration-500 ease-in-out',
CheckBoxLabel: 'text-xs text-gray-500 hover:text-gray-900 transition-all duration-500 ease-in-out underline cursor-pointer',
InputRow: 'flex flex-col sm:flex-row gap-3 w-full justify-between transition-all duration-500 ease-in-out',
Input: 'h-12 w-full px-4 text-base bg-[#f0f2f5] text-gray-700 rounded-xl border-none shadow-[inset_4px_4px_8px_#c8ccd1,_inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all',
InputSmall: 'h-12 w-full px-4 text-base bg-[#f0f2f5] text-gray-700 rounded-xl border-none shadow-[inset_4px_4px_8px_#c8ccd1,_inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all',
Button: 'w-full h-13  text-base bg-black border-black border rounded-[5px] hover:bg-white hover:text-black hover:border-black text-white  transition-all duration-200',


};

const Links = {
Terms: '/legal/term&conditions',
Privacy: '/legal/privacy',
Contact: '/contact',
};

export { styles, theme, Links};