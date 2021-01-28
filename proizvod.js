export class Proizvod
{
    constructor(naziv, tip, cena, x, y, proizvodjac, kolicina)
    {
        this.naziv=naziv;
        this.tip=tip;
        this.cena=cena; 
        this.x=x;
        this.y=y;
        this.kolicina=kolicina;
        this.proizvodjac=proizvodjac;
        this.boje=[];
        this.miniKontejner=null;
        this.pomocniDivZaBoje=null;
    }

    dodajBoju(boja){
        if(!(this.boje.includes(boja)))
        {
            this.boje.push(boja);
            const bojaDiv=document.createElement("div");
            bojaDiv.className="bojaDiv";

            console.log(boja);
            bojaDiv.style.backgroundColor=boja;
            console.log("BOJA FUNC");
            console.log(bojaDiv);
            this.pomocniDivZaBoje.appendChild(bojaDiv);
        }
        else
            console.log("POSTOJI!!!");

    }

    crtaj(host)
    {
        if(!host)
        {
            throw new Error("Host ne postoji");

        }

        
        this.miniKontejner=document.createElement("div");
        this.miniKontejner.classList.add("proizvod");
        this.miniKontejner.innerHTML="Prazno mesto";

        host.appendChild(this.miniKontejner);

        // this.pomocniDivZaBoje=document.createElement("div");
        // this.pomocniDivZaBoje.className="pomocniDivZaBoje";
        // this.miniKontejner.appendChild(this.pomocniDivZaBoje);
        
    }

    dodajProizvodjaca(proizvodjac)
    {
        this.proizvodjac=proizvodjac;

        // this.miniKontejner.innerHTML+="<br />" + "PROIZVODJAC: " + this.proizvodjac.ime;
    }


    azurirajProizvod(kolicina, naziv, tip, x, y, cena, proizvodjac)
    {
        console.log("DODAVANJE");
        console.log(naziv);
        console.log(tip);
        console.log(kolicina);
        console.log(cena);
        this.kolicina=kolicina;
        this.naziv=naziv;
        this.tip=tip;
        this.x=x;
        this.y=y;
        this.cena=cena;
        this.proizvodjac=proizvodjac;
        if(this.naziv==="")
        {
            this.boje=null;
            console.log("Prazno mesto");
            
            this.miniKontejner.innerHTML="Prazno mesto";

        }
        else
        {
            this.miniKontejner.innerHTML=this.naziv + "<br />"
            + this.tip + "<br />" + "Cena: " + this.cena 
            + "<br />" + "Kolicina: " + this.kolicina 
            + "<br />";
            if(this.proizvodjac!=null)
            { 
                this.miniKontejner.innerHTML+= "PROIZVODJAC: " + this.proizvodjac.ime;
            }
   
        }

        this.pomocniDivZaBoje=document.createElement("div");
        this.pomocniDivZaBoje.className="pomocniDivZaBoje";
        this.miniKontejner.appendChild(this.pomocniDivZaBoje);
        
    }

}