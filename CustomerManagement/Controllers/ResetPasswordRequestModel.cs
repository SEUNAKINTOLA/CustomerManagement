﻿using System.ComponentModel.DataAnnotations;

namespace CustomerManagement.Controllers
{
    public class ResetPasswordRequestModel
    {
        public string Token { get; set; }

        public string Email { get; set; }

        public string NewPassword { get; set; }
       public string ConfirmPassword { get; set; }
    }
}