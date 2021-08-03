using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerManagement.Models;
using Microsoft.Extensions.Configuration;

namespace CustomerManagement.Controllers
{
    // [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomerManagementContext _context;
        private IConfiguration _config;

        public CustomersController(IConfiguration config, CustomerManagementContext context)
        {
            _context = context;
            _config = config;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewCustomers>>> Getcustomer()
        {
            return await _context.ViewCustomers.Where(a => a.Status == true).ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult> SendCustomerMessage(Guid id)
        {
            var rec =  await _context.ViewCustomers.Where(a => a.UserId == id).FirstAsync();

            if (rec != null && rec.AdminComment != null)
            {
                SendMail mail = new SendMail(_config);
                await mail.SendAdminComment(rec.AdminComment, rec.EmailAddress, rec.FirstName);
                return Ok();
            }
            else return NotFound();
        }


        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewCustomers>>> GetcustomerByName(string name)
        {
            var TblUser = await _context.ViewCustomers.Where(a => a.UserName.Contains(name) ).ToListAsync();

            try
            {
                int intval = Int32.Parse(name);
                TblUser = await _context.ViewCustomers.Where(a => a.UserName.Contains(name) ).ToListAsync();

            }
            catch (FormatException e)
            {
            
            }

            if (TblUser == null)
            {
                return NotFound();
            }

            return TblUser;
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ViewCustomers>> GetcustomerById(Guid id)
        {
            var TblUser = await _context.ViewCustomers.Where(c=>c.UserId==id).FirstAsync();

            if (TblUser == null)
            {
                return NotFound();
            }

            return TblUser;
        }



        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewCustomers>>> GetcustomerPaginated(int count, int start)
        {
            var customers = await _context.ViewCustomers.Where(a => a.Status == true).Skip(start).Take(count).ToListAsync();

            if (customers == null)
            {
                return NotFound();
            }

            return customers;
        }




        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewCustomers>>> GetDeletedcustomerPaginated(int count, int start)
        {
            var customers = await _context.ViewCustomers.Where(a => a.Status == false).Skip(start).Take(count).ToListAsync();

            if (customers == null)
            {
                return NotFound();
            }

            return customers;
        }



        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<int>> GetcustomerCount()
        {
            var customers = await _context.TblUser.CountAsync();

            return customers;
        }





        // PUT: api/Customers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcustomer(Guid id, ViewCustomers customers)
        {
            TblUser TblUser = new TblUser();
            TblUser.UserId = customers.UserId;
            TblUser.UserName = customers.UserName;
            TblUser.PhoneNumber = customers.PhoneNumber;
            TblUser.FirstName = customers.FirstName;
            TblUser.EmailAddress = customers.EmailAddress;
            TblUser.LastName = customers.LastName;
            TblUser.EmailAddress = customers.EmailAddress;
            TblUser.DateCreated = customers.DateCreated;
            TblUser.LastModifiedDate = DateTime.Today;
            TblUser.Status = customers.Status;


            TblUserDetails userDetails = new TblUserDetails();

            userDetails.UserId = customers.UserId;
            userDetails.UserDetailsId = customers.UserDetailsId;
            userDetails.StateName = customers.StateName;
            userDetails.AddressLine1 = customers.AddressLine1;
            userDetails.AddressLine2 = customers.AddressLine2;
            userDetails.PicturePathOrUrl = customers.PicturePathOrUrl;
            userDetails.CountryId = customers.CountryId;
            userDetails.AdminComment = customers.AdminComment;
            userDetails.LastModifiedDate = DateTime.Today;

            if (id != TblUser.UserId)
            {
                return BadRequest();
            }

            _context.Entry(TblUser).State = EntityState.Modified;
            _context.Entry(userDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!customerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Customers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TblUser>> Postcustomer(ViewCustomers customers)
        {
            TblUser TblUser = new TblUser();
            TblUser.UserId = customers.UserId;
            TblUser.UserName = customers.UserName;
            TblUser.PhoneNumber = customers.PhoneNumber;
            TblUser.EmailAddress = customers.EmailAddress;
            TblUser.FirstName = customers.FirstName;
            TblUser.LastName = customers.LastName;
            TblUser.Status = customers.Status;



            TblUserDetails userDetails = new TblUserDetails();

            userDetails.UserId = customers.UserId;
            userDetails.UserDetailsId = customers.UserDetailsId;
            userDetails.StateName = customers.StateName;
            userDetails.AddressLine1 = customers.AddressLine1;
            userDetails.AddressLine2 = customers.AddressLine2;
            userDetails.PicturePathOrUrl = customers.PicturePathOrUrl;
            userDetails.CountryId = customers.CountryId;
            userDetails.AdminComment = customers.AdminComment;

            var customer = await _context.TblUser.Where(a => a.EmailAddress == TblUser.EmailAddress).ToListAsync();

            if (customer.Any())
            {
                return NotFound("Exists");
            }

            _context.TblUser.Add(TblUser);
            _context.TblUserDetails.Add(userDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblcustomer", new { id = TblUser.UserId }, TblUser);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblUser>> Deletecustomer(Guid id)
        {
            var TblUser = await _context.TblUser.FindAsync(id);
            if (TblUser == null)
            {
                return NotFound();
            }
            TblUser.Status = false;

            _context.Entry(TblUser).State = EntityState.Modified;

            //   _context.TblUser.Remove(TblUser);
            await _context.SaveChangesAsync();

            return TblUser;
        }

        // Retrieve: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblUser>> Retrievecustomer(Guid id)
        {
            var TblUser = await _context.TblUser.FindAsync(id);
            if (TblUser == null)
            {
                return NotFound();
            }
            TblUser.Status = true;

            _context.Entry(TblUser).State = EntityState.Modified;

            //   _context.TblUser.Remove(TblUser);
            await _context.SaveChangesAsync();

            return TblUser;
        }

        private bool customerExists(Guid id)
        {
            return _context.TblUser.Any(e => e.UserId == id);
        }
    }
}
