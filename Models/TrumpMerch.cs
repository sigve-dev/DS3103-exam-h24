using backend.Interfaces;

namespace backend.Models;

public class TrumpMerch : ITrumpMerch
{
    public int Id {get; set;}
    public string? Name {get; set;}
    public string? Image {get; set;}
    public string? Type {get; set;}
    public int Quantity {get; set;}
    public int Price {get; set;}
    public string? Details {get; set;}
}