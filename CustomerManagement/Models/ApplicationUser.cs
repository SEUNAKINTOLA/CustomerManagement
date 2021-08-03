using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerManagement.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [ProtectedPersonalData]
        public virtual string FirstName { get; set; }

        [ProtectedPersonalData]
        public virtual string LastName { get; set; }
    }
}
