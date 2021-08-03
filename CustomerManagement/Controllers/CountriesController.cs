using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerManagement.Models;

namespace CustomerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly CustomerManagementContext _context;

        public CountriesController(CustomerManagementContext context)
        {
            _context = context;
        }

        // GET: api/Countries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblCountry>>> GetTblCountry()
        {
            return await _context.TblCountry.ToListAsync();
        }

        // GET: api/Countries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblCountry>> GetTblCountry(int id)
        {
            var tblCountry = await _context.TblCountry.FindAsync(id);

            if (tblCountry == null)
            {
                return NotFound();
            }

            return tblCountry;
        }

        // PUT: api/Countries/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblCountry(Guid id, TblCountry tblCountry)
        {
            if (id != tblCountry.CountryId)
            {
                return BadRequest();
            }

            _context.Entry(tblCountry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblCountryExists(id))
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

        // POST: api/Countries
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TblCountry>> PostTblCountry(TblCountry tblCountry)
        {
            _context.TblCountry.Add(tblCountry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblCountry", new { id = tblCountry.CountryId }, tblCountry);
        }

        // DELETE: api/Countries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblCountry>> DeleteTblCountry(int id)
        {
            var tblCountry = await _context.TblCountry.FindAsync(id);
            if (tblCountry == null)
            {
                return NotFound();
            }

            _context.TblCountry.Remove(tblCountry);
            await _context.SaveChangesAsync();

            return tblCountry;
        }

        private bool TblCountryExists(Guid id)
        {
            return _context.TblCountry.Any(e => e.CountryId == id);
        }
    }
}
