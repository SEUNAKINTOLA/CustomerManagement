using System;
using System.Collections.Generic;
using System.Text;

namespace CustomerManagement.Models
{
    public class UserInfo
    {
        public bool IsAuthenticated { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }

        public Dictionary<string, string> ExposedClaims { get; set; }
    }
}
