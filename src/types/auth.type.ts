 export interface ISendOtp {
    email : string
 }

 export interface IOtpVerify{
    otp : string ;
    email: string;
 }

 export interface IResponse <T> {
    statusCode : number ;
    success : boolean ;
    message : string ;
    data : T ;
 }