using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CustomerManagement.Models
{
    public partial class TblUserDetails
    {
        public Guid UserDetailsId { get; set; }
        public Guid UserId { get; set; }
        public string PicturePathOrUrl { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string StateName { get; set; }
        public Guid CountryId { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public Guid? LastmodifiedBy { get; set; }
        public string AdminComment { get; set; }

        public virtual TblUser CreatedByNavigation { get; set; }
        public virtual TblUser LastmodifiedByNavigation { get; set; }
    }
}
