using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CustomerManagement.Models
{
    public partial class LoginParameters
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
