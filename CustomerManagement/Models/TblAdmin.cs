using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CustomerManagement.Models
{
    public partial class TblAdmin
    {
        public Guid AdminId { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public Guid? LastModifiedBy { get; set; }
        public int IndexNumber { get; set; }
    }
}
