export interface Credentials {
    email: string;  
    password: string;
}

export interface ResetCredentials {
    email: string;  
    password: string;
    cpassword: string;
}