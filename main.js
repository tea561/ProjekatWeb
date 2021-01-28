import {Kategorija} from "./kategorija.js";
import { Proizvodjac } from "./proizvodjac.js";

fetch("https://localhost:5001/Store/PreuzmiKategorije").then(p => {
    p.json().then(data => {
        data.forEach(kategorija => {
            //proveri property
            const kat = new Kategorija(kategorija.id, kategorija.naziv, kategorija.n, kategorija.m);
            kat.crtanjeKategorije(document.body);

            kategorija.proizvodi.forEach(proizvod => {
                fetch("https://localhost:5001/Store/PreuzimanjeProizvodjaca").then(p=>{
                    p.json().then(data=>{
                        data.forEach(proizvodjac => {
                            
                            
                            if(proizvodjac.id == proizvod.idProizvodjac)
                            {
                                const temp = new Proizvodjac(proizvodjac.id,proizvodjac.ime, proizvodjac.adresa, proizvodjac.kontakt);
                                kat.proizvodi[proizvod.x*kat.m + proizvod.y].azurirajProizvod(proizvod.kolicina, proizvod.naziv, proizvod.tip, proizvod.x, proizvod.y, proizvod.cena, temp);
                                if(proizvod.boje!=null)
                                {
                                   for(let i=0;i<proizvod.boje.length;i++)
                                   {
                                    kat.proizvodi[proizvod.x*kat.m + proizvod.y].dodajBoju(proizvod.boje[i]);
                                   }
                                }
                                //console.log(temp);
                                //console.log("MAIN");
                            }
                           
                        });
                    });      
               
               });
               
            });
        });
    });
});

// const kat = new Kategorija("Soba", 3, 4);
// kat.crtanjeKategorije(document.body);

// const kat2 = new Kategorija("Kuhinja", 2, 5);
// kat2.crtanjeKategorije(document.body);

