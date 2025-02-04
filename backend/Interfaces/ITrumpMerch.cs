namespace backend.Interfaces;

interface ITrumpMerch 
{
    int Id {get; set;}
    string? Name {get; set;}
    string? Image {get; set;}
    string? Type {get; set;}
    int Quantity {get; set;}
    int Price {get; set;}
    string? Details {get; set;}
}

