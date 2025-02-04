using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Contexts;
using backend.Models;

[ApiController]
[Route("api/[controller]")]
public class TrumpStaffController : ControllerBase
{
    private readonly TrumpContexts _context;

    public TrumpStaffController(TrumpContexts context)
    {
        _context = context;
    }

    [HttpGet("all")]
    public async Task<ActionResult<List<TrumpStaff>>> GetAll()
    {
        try
        {
            var staff = await _context.TrumpStaffers.ToListAsync();
            return Ok(staff);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving staff: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<ActionResult<TrumpStaff>> Post([FromBody] TrumpStaff newStaff)
    {
        try
        {
            _context.TrumpStaffers.Add(newStaff);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = newStaff.Id }, newStaff);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error adding staff: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var staff = await _context.TrumpStaffers.FindAsync(id);
        if (staff == null) return NotFound("Staff member not found");

        try
        {
            _context.TrumpStaffers.Remove(staff);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error deleting staff: {ex.Message}");
        }
    }
}
