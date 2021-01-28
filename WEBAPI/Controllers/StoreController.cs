using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WEBAPI.Models;

namespace WEBAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StoreController : ControllerBase
    {
       public StoreContext Context { get; set; }
       
        public StoreController(StoreContext context)
        {
            Context=context;
        }

        //metoda koja vraca sve kategorije

        [Route("PreuzmiKategorije")]
        [HttpGet]
        public async Task<List<Kategorija>> PreuzmiKategorije()
        {
            //return await Context.Kategorije.ToListAsync();

            return await Context.Kategorije.Include(k => k.Proizvodi).ToListAsync();
        }

        [Route("UpisiKategoriju")]
        [HttpPost]
        public async Task UpisiKategoriju([FromBody] Kategorija kategorija)
        {
            Context.Kategorije.Add(kategorija);
            await Context.SaveChangesAsync();
        }

        

        [Route("IzmeniKategoriju")]
        [HttpPut]
        public async Task IzmeniKategoriju([FromBody] Kategorija kategorija)
        {
            // var staraKategorija= await Context.Kategorije.FindAsync(kategorija.ID);
            // staraKategorija.Naziv=kategorija.Naziv;
            // staraKategorija.M=kategorija.M;
            // staraKategorija.N=kategorija.N;


            Context.Update<Kategorija>(kategorija);
            await Context.SaveChangesAsync();

        }

        [Route("IzbrisiKategoriju/{id}")]
        [HttpDelete]
        public async Task IzbrisiKategoriju(int id)
        {
            //var kategorija=await Context.FindAsync<Kategorija>(id);
            var kategorija=await Context.Kategorije.FindAsync(id);
            Context.Remove(kategorija);
            await Context.SaveChangesAsync();
        }  
        
        //CreateProizvod
        [Route("UpisProizvoda/{idKat}")]
        [HttpPost]
        public async Task<IActionResult> UpisProizvoda(int idKat, [FromBody] Proizvod proizvod)
        {
            var kat = await Context.Kategorije.FindAsync(idKat);
            proizvod.Kategorija=kat;

            if(Context.Proizvodi.Any(p=>p.Kategorija==proizvod.Kategorija && p.Naziv == proizvod.Naziv && p.Tip == proizvod.Tip && (proizvod.X != p.X || proizvod.Y != p.Y)))
            {
                var xy = Context.Proizvodi.Where(p =>p.Kategorija==proizvod.Kategorija && p.Naziv == p.Naziv).FirstOrDefault();
                return BadRequest(new { X = xy?.X, Y = xy?.Y });
            }
            
         
            var pr = Context.Proizvodi.Where(p=>p.Kategorija==proizvod.Kategorija && p.X == proizvod.X && p.Y == proizvod.Y).FirstOrDefault();

            if(pr!=null)
            {
                return StatusCode(406);

            }
            else
            {
                Context.Proizvodi.Add(proizvod);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }

        //ReadProizvod
        [Route("CitanjeProizvoda")]
        [HttpGet]
        public async Task<List<Proizvod>> CitanjeProizvoda()
        {
            return await Context.Proizvodi.ToListAsync();
        }

        [Route("CitajProizvod/{id}")]
        [HttpGet]
        public async Task<ActionResult<Proizvod>> CitajProizvod(int id)
        {
            var pr = await Context.Proizvodi.FindAsync(id);
            if(pr!=null)
            {
                return pr;
            }
            else
            {
                return BadRequest();
            }
        }


        //UpdateProizvod
        [Route("AzuriranjeProizvoda/{idKat}")]
        [HttpPut]
        public async Task<IActionResult> AzuriranjeProizvoda(int idKat, [FromBody] Proizvod proizvod)
        {
            
            var pr = Context.Proizvodi.Where(p=>p.Kategorija.ID==idKat && p.X==proizvod.X && p.Y==proizvod.Y).FirstOrDefault();
            if(pr!=null && pr.Naziv!="string")
            {
                pr.Naziv=proizvod.Naziv;
                pr.Tip=proizvod.Tip;
                pr.Cena=proizvod.Cena;
                pr.Kolicina=proizvod.Kolicina;
                pr.Boje=proizvod.Boje;
                pr.IDProizvodjac=proizvod.IDProizvodjac;
                //azurira proizvod samo ukoliko postoji 
                //provera da li postoji je da li je naziv != string
                Context.Update<Proizvod>(pr);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                
                return StatusCode(406);
            }

        }

        //DeleteProizvod
        [Route("BrisanjeProizvoda/{idKat}")]
        [HttpDelete]
        public async Task<IActionResult> BrisanjeProizvoda(int idKat,[FromBody]Proizvod proizvod)
        {
            var pr=Context.Proizvodi.Where(p=>p.Kategorija.ID == idKat && p.X==proizvod.X && p.Y == proizvod.Y).FirstOrDefault();

            if(pr!=null)
            {
                Context.Proizvodi.Remove(pr);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return StatusCode(406);
            }
        }


        //CreateProizvodjac
        [Route("UpisProizvodjaca")]
        [HttpPost]
        public async Task<IActionResult> UpisProizvodjaca([FromBody] Proizvodjac proizvodjac)
        {
            //Ukoliko postoji proizvodjac sa istim imenom ili adresom ne moze da se unese
            if(Context.Proizvodjaci.Any(p => p.Ime==proizvodjac.Ime || p.Adresa==proizvodjac.Adresa))
            {
                return BadRequest();
            }
            else
            {
                Context.Proizvodjaci.Add(proizvodjac);
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        //Preuzimanje proizvodjaca
        [Route("PreuzimanjeProizvodjaca")]
        [HttpGet]
        public async Task<List<Proizvodjac>> PreuzimanjeProizvodjaca()
        {
            return await Context.Proizvodjaci.ToListAsync();
        }

        //Delete 
        [Route("BrisanjeProizvodjaca")]
        [HttpDelete]
        public async Task<IActionResult> BrisanjeProizvodjaca([FromBody]Proizvodjac proizvodjac)
        {
            var pr=Context.Proizvodjaci.Where(p=>p.Ime==proizvodjac.Ime).FirstOrDefault();

            if(pr!=null)
            {
                Context.Proizvodjaci.Remove(pr);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return StatusCode(406);
            }
        }
     }
}
