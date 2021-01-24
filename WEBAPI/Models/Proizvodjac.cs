using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WEBAPI.Models
{
    public class Proizvodjac
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("Adresa")]
        [MaxLength(255)]
        public string Adresa { get; set; }

        [Column("Kontakt")]
        [MaxLength(25)]
        public string Kontakt { get; set; }


    }
}