using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CustomerManagement.Models
{
    public partial class ViewCustomers
    {
        public Guid UserId { get; set; }
        public Guid UserDetailsId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public DateTime DateCreated { get; set; }
        public bool? Status { get; set; }
        public string PicturePathOrUrl { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string StateName { get; set; }
        public Guid CountryId { get; set; }
        public string AdminComment { get; set; }
    }
}
