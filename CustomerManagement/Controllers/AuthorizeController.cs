using CustomerManagement.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using System.Web;
using Microsoft.AspNetCore.Http;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace CustomerManagement.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private IConfiguration _config;
        private readonly CustomerManagementContext _context;


        public AuthorizeController(CustomerManagementContext context, IConfiguration config, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;

            _context = context;
            _config = config;

        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginParameters parameters)
        {
            var user = await _userManager.FindByEmailAsync(parameters.UserName);
            if (user == null) user = await _userManager.FindByNameAsync(parameters.UserName);
            if (user == null) return BadRequest("User does not exist");
            var singInResult = await _signInManager.CheckPasswordSignInAsync(user, parameters.Password, false);
            if (!singInResult.Succeeded) return BadRequest("Invalid password");

            await _signInManager.SignInAsync(user, parameters.RememberMe);

            return Ok();
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterParameters parameters)
        {
            var user = new ApplicationUser();
            user.UserName = parameters.Email;
            user.Email = parameters.Email;
            user.FirstName = parameters.FirstName;
            user.LastName = parameters.LastName;
            var result = await _userManager.CreateAsync(user, parameters.Password);
            if (!result.Succeeded) return BadRequest(result.Errors.FirstOrDefault()?.Description);
            else
            {

                var user2 = await _context.AspNetUsers.Where(c => c.Email == parameters.Email).FirstAsync();

                if (user2 !=  null)
                {
                    TblAdmin admin = new TblAdmin();
                    admin.UserId = user2.Id;
                    _context.TblAdmin.Add(admin);
                    await _context.SaveChangesAsync();
                }

                const string subject = "CustomerManagement - Registration successful";
                var body = "<html><body>" +
                           $"<p>Hi {user.UserName}!</p>" +
                           "<p>You have succesfully created your CustomerManagement admin account.</p>" +
                           "</body></html>";

                var apiKey = _config.GetValue<String>("SendGridKey");
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress("CustomerManagement@testingmail.com", "CustomerManagement"),
                    Subject = subject,
                    HtmlContent = body
                };
                msg.AddTo(new EmailAddress(parameters.Email));
                var response = await client.SendEmailAsync(msg);
            }
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetResetPasswordToken(string email)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) user = await _userManager.FindByNameAsync(email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return NoContent();
            }

            var host = HttpContext.Request.Host.ToUriComponent();
            var token = _userManager.GeneratePasswordResetTokenAsync(user).Result;
            var callbackUrl = $"http://{host}/CustomerManagement/reset-pass?email={user.UserName}&token={HttpUtility.UrlEncode(token)}";

            var body = "<html><body>" +
                       "<h2>Password reset</h2>" +
                       $"<p>Hi {user.UserName}, please click <a href=\"{callbackUrl}\">  this link to reset your password </a></p>" +
                       "</body></html>";


            var apiKey = _config.GetValue<String>("SendGridKey");
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("CustomerManagement@testingmail.com", "CustomerManagement"),
                Subject = "CustomerManagement - Password reset.",
                HtmlContent = body
            };
            msg.AddTo(new EmailAddress(email));
            var response = await client.SendEmailAsync(msg);

            return Ok(response.StatusCode);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPasswordAsync3(ResetPasswordRequestModel resetpassparam)
        {
            var user = await _userManager.FindByEmailAsync(resetpassparam.Email);
            if (user == null) user = await _userManager.FindByNameAsync(resetpassparam.Email);
            var result = _userManager.ResetPasswordAsync(user, resetpassparam.Token, resetpassparam.NewPassword).Result;

            if (result.Succeeded)
            {
                const string subject = "Client - Password reset success.";
                var body = "<html><body>" +
                           "<h1>Your password for Client was reset</h1>" +
                           $"<p>Hi {user.UserName}!</p>" +
                           "<p>Your password for Client was reset. Please inform us if you did not request this change.</p>" +
                           "</body></html>";

                var apiKey = _config.GetValue<String>("SendGridKey");
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress("CustomerManagement@testingmail.com", "CustomerManagement"),
                    Subject = subject,
                    HtmlContent = body
                };
                msg.AddTo(new EmailAddress(resetpassparam.Email));
                var response = await client.SendEmailAsync(msg);

                return Ok();
            }

           return BadRequest(result.Errors.FirstOrDefault()?.Description);

        }


        [HttpGet]
        public async Task<UserInfo> UserInfoAsync()
            {
                //var user = await _userManager.GetUserAsync(HttpContext.User);
                return await BuildUserInfoAsync();
        }


    
        private string GenerateJSONWebToken(String Email)
        {

            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", Email) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<UserInfo> BuildUserInfoAsync()
        {
            IActionResult response = Unauthorized();
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            return new UserInfo
            {
                IsAuthenticated = User.Identity.IsAuthenticated,
                UserName = User.Identity.Name,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = GenerateJSONWebToken(User.Identity.Name),
                ExposedClaims = User.Claims
                    //Optionally: filter the claims you want to expose to the client
                    //.Where(c => c.Type == "test-claim")
                    .ToDictionary(c => c.Type, c => c.Value)
            };
        }
    }
}
