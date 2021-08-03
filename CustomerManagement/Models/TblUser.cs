using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CustomerManagement.Models
{
    public partial class TblUser
    {
        public TblUser()
        {
            TblCountryCreatedByNavigation = new HashSet<TblCountry>();
            TblCountryLastModifedByNavigation = new HashSet<TblCountry>();
            TblUserDetailsCreatedByNavigation = new HashSet<TblUserDetails>();
            TblUserDetailsLastmodifiedByNavigation = new HashSet<TblUserDetails>();
        }

        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public DateTime DateCreated { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public Guid LastModifiedBy { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<TblCountry> TblCountryCreatedByNavigation { get; set; }
        public virtual ICollection<TblCountry> TblCountryLastModifedByNavigation { get; set; }
        public virtual ICollection<TblUserDetails> TblUserDetailsCreatedByNavigation { get; set; }
        public virtual ICollection<TblUserDetails> TblUserDetailsLastmodifiedByNavigation { get; set; }
    }
}
