using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CustomerManagement.Models
{
    public partial class TblCountry
    {
        public Guid CountryId { get; set; }
        public string CountryName { get; set; }
        public string Flag { get; set; }
        public DateTime DateCreated { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public Guid? LastModifedBy { get; set; }
        public int IndexNumber { get; set; }

        public virtual TblUser CreatedByNavigation { get; set; }
        public virtual TblUser LastModifedByNavigation { get; set; }
    }
}
