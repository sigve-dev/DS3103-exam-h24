using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Contexts;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TrumpMerchController : ControllerBase
{
    private readonly TrumpContexts _context;

    // Konstruktor som tar inn en databasekontekst for å kommunisere med databasen
    public TrumpMerchController(TrumpContexts context)
    {
        _context = context;
    }

    // 1. Henter alle produkter (merchandise) fra databasen
    [HttpGet]
    public async Task<ActionResult<List<TrumpMerch>>> GetAll()
    {
        try
        {
            return Ok(await _context.TrumpMerches.ToListAsync()); // Returnerer alle produkter som en liste
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving merchandise: {e.Message}");
        }
    }

    // 2. Henter et spesifikt produkt ved hjelp av ID
    [HttpGet("{id}")]
    public async Task<ActionResult<TrumpMerch>> GetById(int id)
    {
        // Søker etter produkt basert på ID
        var merch = await _context.TrumpMerches.FindAsync(id); 

        // Returnerer en feilmelding, nærmere sagt 404, dersom produktet ikke finnes
        return merch == null ? NotFound() : Ok(merch); 
    }

    // 3. Henter produkter som inneholder et spesifikt navn
    [HttpGet("by-name/{name}")]
    public async Task<ActionResult<List<TrumpMerch>>> GetByName(string name)
    {
        // Filtrerer produkter som inneholder navnet
        var merchList = await _context.TrumpMerches
            .Where(merch => merch.Name.Contains(name)) 
            .ToListAsync();

        return Ok(merchList);
    }

    // 4. Oppretter et nytt produkt (merchandise) og lagrer det i databasen
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TrumpMerch newMerch)
    {
        // Validerer at nødvendige felter er fylt ut
        if (string.IsNullOrWhiteSpace(newMerch.Name) || string.IsNullOrEmpty(newMerch.Image))
        {
            return BadRequest("Merchandise details are invalid.");
        }

        try
        {
            // Legger til nytt produkt i databasen
            _context.TrumpMerches.Add(newMerch); 

            // Lagrer endringene
            await _context.SaveChangesAsync(); 

            return CreatedAtAction(nameof(GetById), new { id = newMerch.Id }, newMerch);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating merchandise: {e.Message}");
        }
    }

    // 5. Oppdaterer et eksisterende produkt basert på ID
    // Definitivt en av de mer utfordrende kodene jeg arbeidet med i tillegg til bildeopplast. 
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, [FromBody] TrumpMerch updatedMerch)
    {
        // Sjekker om ID fra URL matcher ID i det oppdaterte produktet
        if (id != updatedMerch.Id)
        {
            return BadRequest("ID mismatch.");
        }

        // Søker etter eksisterende produkt
        var existingMerch = await _context.TrumpMerches.FindAsync(id); 
        if (existingMerch == null)
        {
            return NotFound(); 
        }

        try
        {
            // Oppdaterer verdiene i det eksisterende produktet
            existingMerch.Name = updatedMerch.Name;
            existingMerch.Price = updatedMerch.Price;
            existingMerch.Image = updatedMerch.Image;
            existingMerch.Type = updatedMerch.Type;
            existingMerch.Quantity = updatedMerch.Quantity;
            existingMerch.Details = updatedMerch.Details;

            _context.Entry(existingMerch).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent(); 
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error updating merchandise: {e.Message}");
        }
    }

    // 6. Sletter et produkt basert på ID
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var merch = await _context.TrumpMerches.FindAsync(id);
        if (merch == null)
        {
            return NotFound(); 
        }

        try
        {
            // Fjerner produktet fra databasen
            _context.TrumpMerches.Remove(merch); 
            await _context.SaveChangesAsync();
            return NoContent(); 
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error deleting merchandise: {e.Message}");
        }
    }
}
