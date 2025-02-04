using backend.Interfaces;

namespace backend.Models;

public class TrumpStaff : ITrumpStaff
{
    public int Id {get; set;}
    public string? Name {get; set;}
    public string? Department {get; set;} 
    public string? Position {get; set;}
}