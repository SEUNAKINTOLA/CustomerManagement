import { Guid } from "guid-typescript";

export class CustomerPhoto {
    URL: string;
  }



  export class CustomerView {
    UserId : string =  null;
    UserDetailsId  :  string= null;
    UserName  :  string= null;
    FirstName  :  string = null;
    LastName  :  string = null ;
    PhoneNumber  :  string = null;
    EmailAddress  :  string = "" ;
    DateCreated  :  string = null;
    LastModifiedDate  :  string = null;
    Status  :  boolean = true;
    PicturePathOrUrl  :  string = null;
    AddressLine1  :  string = null ;
    AddressLine2  :  string  = null;
    StateName  :  string = null;
    CountryId  :  string = null;
    AdminComment: string =null;
    }

    export class CustomerDetails {
      UserId : string= null;
      UserDetailsId  :  string= null;
      DateCreated  :  string = null;
      PicturePathOrUrl  :  string = null;
      AddressLine1  :  string = "" ;
      AddressLine2  :  string  ;
      StateName  :  string = null;
      CountryId  :  string = null;
      }
      
      
      export class Customer {
        UserId : string= null;
        UserName  :  string= null;
        FirstName  :  string = null;
        LastName  :  string = null ;
        Phonestring  :  string = null;
        EmailAddress  :  string = "" ;
        DateCreated  :  string = null;
        Status  :  boolean = true;
        }
      
    
  export class country{
    CountryId : string;
    CountryName: string;
    Flag : string;
  }
  export class state{
    StateId : string;
    State: string;
    StateCapital : string;
  }

