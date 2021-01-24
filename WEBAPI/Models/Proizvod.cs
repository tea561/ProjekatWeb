using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WEBAPI.Models
{
    public class Proizvod 
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("Tip")]
        [MaxLength(255)]
        public string Tip { get; set; }

        [Column("Cena")]
        public int Cena { get; set; }

        [Column("Kolicina")]
        public int Kolicina { get; set; }

        [Column("X")]
        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }

        private string boje;

        [NotMapped]
        [Column("Boje")]
        public string[] Boje
        {
            get; set;
            // get
            // {
            //     return boje.Split(';');
            // }
            // set
            // {
            //     boje=string.Join(';', value);
            // }
        }

        [Column("IDProizvodjac")]
        public int IDProizvodjac{get; set;}

        //kategorija nije potrebna za serializaciju
        [JsonIgnore]
        public Kategorija Kategorija {get; set;}

    }
}