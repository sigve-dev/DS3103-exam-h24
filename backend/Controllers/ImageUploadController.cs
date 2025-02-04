using Microsoft.AspNetCore.Mvc;

namespace SpillApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{    
    private readonly IWebHostEnvironment _webHostEnvironment;

    // Konstruktor som tar inn IWebHostEnvironment for å hjelpe med å håndtere filstier og rotkatalog
    public ImageUploadController(IWebHostEnvironment webHostEnvironment) 
    {
        _webHostEnvironment = webHostEnvironment;
    }

    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        try
        {
            // Sjekker om filen er null eller tom
            if (file == null || file.Length == 0)
            {
                // Returnerer en feilmelding hvis filen ikke er lastet opp
                return BadRequest("No file uploaded."); 
            }

            // Henter rotkatalogen for web-appen
            string webRootPath = _webHostEnvironment.WebRootPath;

            // Setter opp stien til bildekatalogen
            string imagesPath = Path.Combine(webRootPath, "images");

            // Full absolutt sti til hvor filen skal lagres
            string absolutePath = Path.Combine(imagesPath, file.FileName);

            // Oppretter "images"-katalogen hvis den ikke finnes fra før
            Directory.CreateDirectory(imagesPath);

            // Oppretter og skriver filen til den oppgitte stien
            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                // Kopierer innholdet i filen asynkront til den angitte stien
                await file.CopyToAsync(fileStream); 
            }

            // Returnerer kun filnavnet som svar, uten å inkludere hele stien
            return Ok(new { fileName = file.FileName });
        }
        catch (Exception ex)
        {
            // Logger feil til konsollen og returnerer en feilmelding med statuskode 500
            Console.WriteLine($"Error uploading image: {ex.Message}");
            return StatusCode(500, "Failed to upload the image.");
        }
    }
}
