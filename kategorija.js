import { Proizvod } from "./proizvod.js"
import { Proizvodjac} from "./proizvodjac.js"

export class Kategorija 
{
    constructor(id, naziv, n, m)
    {
        this.id=id;
        this.naziv=naziv;
        this.n=n;
        this.m=m;
        this.proizvodi=[];
        this.proizvodjaci=[];
        this.kontejner=null;
    }

    dodajProizvod(proizvod)
    {
        this.proizvodi.push(proizvod);
    }

    dodajProizvodjaca(proizvodjac)
    {
        this.proizvodjaci.push(proizvodjac);

    }
    crtanjeKategorije(host)
    {
        if(!host)
            throw new Error("Host ne postoji!");

        const naslov = document.createElement("h2");
        naslov.innerHTML=this.naziv;
        host.appendChild(naslov);

        this.kontejner=document.createElement("div");
        this.kontejner.classList.add("kategorija");
        host.appendChild(this.kontejner);

        this.crtanjeForme(this.kontejner);
        // this.crtanjeFormeProizvodjac(this.kontejner);
        // this.crtanjeFormeProizvod(this.kontejner);

        this.crtanjeProizvoda(this.kontejner);
    }

    crtanjeForme(host)
    {
        const forma = document.createElement("div");
        forma.className="Forma";
        host.appendChild(forma);

        this.crtanjeFormeProizvod(forma);
        this.crtanjeFormeProizvodjac(forma);
        

    }
    crtanjeFormeProizvodjac(host)
    {
        const kategorijaForma=document.createElement("div");
        kategorijaForma.className="addProizvodjac";
        
        host.appendChild(kategorijaForma);

        //dodavanje proizvodjaca
        var labela=document.createElement("h4");
        labela.innerHTML="Dodavanje proizvodjaca";
        kategorijaForma.appendChild(labela);

        labela=document.createElement("label");
        labela.innerHTML="Naziv proizvodjaca: ";
        kategorijaForma.appendChild(labela);

        let tb=document.createElement("input");
        tb.className="Ime";
        kategorijaForma.appendChild(tb);

        labela=document.createElement("label");
        labela.innerHTML="Adresa: ";
        kategorijaForma.appendChild(labela);

        tb=document.createElement("input");
        tb.className="Adresa"; //ne treba nam ???
        kategorijaForma.appendChild(tb);

        labela=document.createElement("label");
        labela.innerHTML="Kontakt: ";
        kategorijaForma.appendChild(labela);

        tb=document.createElement("input");
        tb.className="Kontakt";
        kategorijaForma.appendChild(tb);

        const dugmeProizvodjacDodaj=document.createElement("button");
        dugmeProizvodjacDodaj.innerHTML="Dodaj proizvodjaca";
        kategorijaForma.appendChild(dugmeProizvodjacDodaj);

        dugmeProizvodjacDodaj.onclick=(ev)=>{
            const naziv=this.kontejner.querySelector(".Ime");
            const adresa=this.kontejner.querySelector(".Adresa");
            const kontakt=this.kontejner.querySelector(".Kontakt");

            if(naziv.value=="")
            {
                alert("Uneti naziv proizvodjaca!");
            }
            else if(adresa.value=="")
            {
                alert("Uneti adresu proizvodjaca!");
            }
            else if(kontakt.value="")
            {
                alert("Uneti kontakt proizvodjaca!");

            }
            
            else
            {

                //provera da li vec postoji

                let proizvodjacPostoji=this.proizvodjaci.find(proizvodjac =>proizvodjac.naziv==naziv.value && proizvodjac.adresa==adresa.value 
                    && proizvodjac.kontakt==kontakt.value);

                if(proizvodjacPostoji)
                {
                    alert("Proizvodjac vec postoji.");
                }
                else
                {
                    var p = new Proizvodjac(naziv.value, adresa.value, kontakt.value);
                    this.proizvodjaci.push(p);


                    this.azurirajSelectProizvodjac(this.kontejner.querySelector(".selectProizvodjac"));
 
                }
                naziv.value="";
                adresa.value="";
                kontakt.value="";

                
            }

        }


    }
    crtanjeFormeProizvod(host)
    {
        console.log(this.proizvodjaci);
        const kontProizvod=document.createElement("div");
        kontProizvod.className="addProizvod";
        
        host.appendChild(kontProizvod);

        var labela = document.createElement("h3");
        labela.innerHTML="Dodavanje proizvoda";
        kontProizvod.appendChild(labela);

        //Naziv
        labela=document.createElement("label");
        labela.innerHTML="Naziv: ";
        kontProizvod.appendChild(labela);

        let tb=document.createElement("input");
        tb.className="NazivProizvoda";
        kontProizvod.appendChild(tb);

        //Tip
        labela=document.createElement("label");
        labela.innerHTML="Tip: ";
        kontProizvod.appendChild(labela);

        tb=document.createElement("input");
        tb.className="TipProizvoda";
        kontProizvod.appendChild(tb);

        //Cena
        labela=document.createElement("label");
        labela.innerHTML="Cena: ";
        kontProizvod.appendChild(labela);

        tb=document.createElement("input");
        tb.type="number";
        tb.className="Cena";
        kontProizvod.appendChild(tb);

        //Kolicina
        labela=document.createElement("label");
        labela.innerHTML="Kolicina: ";
        kontProizvod.appendChild(labela);

        tb=document.createElement("input");
        tb.type="number";
        tb.className="KolicinaProizvoda";
        kontProizvod.appendChild(tb);

        //Dodavanje pozicije (x,y)
        let pozDiv=document.createElement("div");
        let selectX=document.createElement("select");
        labela=document.createElement("label");
        labela.innerHTML="X: ";
       
        pozDiv.appendChild(labela);
        pozDiv.appendChild(selectX);
        let opcija=null;

        for(let i=0;i<this.n;i++)
        {
            opcija=document.createElement("option");
            opcija.innerHTML=i;
            opcija.value=i;
            selectX.appendChild(opcija);

        }
        kontProizvod.appendChild(pozDiv);
           
        pozDiv=document.createElement("div");
        let selectY=document.createElement("select");
        labela=document.createElement("label");
        labela.innerHTML="Y: ";

        pozDiv.appendChild(labela);
        pozDiv.appendChild(selectY);

        for(let i=0;i<this.m;i++)
        {
            opcija=document.createElement("option");
            opcija.innerHTML=i;
            opcija.value=i;
            selectY.appendChild(opcija);
        }
        kontProizvod.appendChild(pozDiv);


        //Dodavanje boje
        const divDodajBoju=document.createElement("div");
        divDodajBoju.className="divDodajBoju";
        kontProizvod.appendChild(divDodajBoju);
        
        let a=parseInt(selectX.value);
        let b=parseInt(selectY.value);
        
        labela=document.createElement("h5");
        labela.innerHTML="Dodavanje boje ";
        divDodajBoju.appendChild(labela);
    
        tb=document.createElement("input");
        tb.type="color";
        tb.className="Color";
        divDodajBoju.appendChild(tb);
    
        const buttonColor = document.createElement("button");
        buttonColor.innerHTML="Dodaj boju";
        divDodajBoju.appendChild(buttonColor);
        
        
    
        let boje=[];
        const pomocniDivZaBoje=document.createElement("div");
        pomocniDivZaBoje.className="pomocniDivZaBoje";
        divDodajBoju.appendChild(pomocniDivZaBoje);

        buttonColor.onclick=(ev)=>{
        

            const boja = this.kontejner.querySelector(".Color").value;
            if(boje!=null)
            {
                if(!boje.includes(boja))
                {
                    
                    console.log(boja);
                    boje.push(boja);
                    const bojaDiv=document.createElement("div");
                    bojaDiv.className="bojaDiv";
                    bojaDiv.style.backgroundColor=boja;
                    pomocniDivZaBoje.appendChild(bojaDiv);
                }
            }
            else
            {
                boje.push();
            }
        
        
         }

        //Dugme dodaj
        const dugme = document.createElement("button");
        dugme.innerHTML="Dodaj proizvod";
        kontProizvod.appendChild(dugme);
        dugme.onclick=(ev)=>{
            dugmeUpdate.disabled=false;
            dugme.innerHTML="Dodaj proizvod";
            const naziv=this.kontejner.querySelector(".NazivProizvoda");
            const tip=this.kontejner.querySelector(".TipProizvoda");
            const cena=this.kontejner.querySelector(".Cena");
            const kolicina=this.kontejner.querySelector(".KolicinaProizvoda");
            
            if(naziv.value=="")
            {
                alert("Uneti naziv proizvoda!");
            }
            else if(tip.value=="")
            {
                alert("Uneti tip proizvoda!");
            }
            else if(isNaN(cena.value))
            {
                alert("Uneti cenu proizvoda!");

            }
            else if(isNaN(kolicina.value))
            {
                alert("Uneti kolicinu proizvoda!");
            }
            else
            {

                let a=parseInt(selectX.value);
                let b=parseInt(selectY.value);


                //console.log("Select proizvodjac" + selectProizvodjac.value);
                let temp=selectProizvodjac.value;
                let proizvodjac=this.proizvodjaci.find(p=>p.ime==temp);


                fetch("https://localhost:5001/Store/UpisProizvoda/" + this.id, {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        "naziv": naziv,
                        "tip": tip,
                        "cena": cena,
                        "kolicina" : kolicina,
                        "x" : a,
                        "y": b,
                        "idProizvodjac":proizvodjac.id,
                        "boje" : boje
                        })
                    }).then(p=>{
                        if(p.ok){
                            this.proizvodi[a*this.m + b].azurirajProizvod(kolicina.value, naziv.value, tip.value, a, b, cena.value, proizvodjac);
                            if(boje!=null)
                            {
                                boje.forEach(element => {
                                    this.proizvodi[a*this.m+b].dodajBoju(element);
                                })
                            }

                        }
                        else if(p.status==400)
                        {
                            const postoji={x:0, y:0};
                            p.json().then(q=> {
                                postoji.x=q.x;
                                postoji.y=q.y;
                                alert("Proizvod postoji u katalogu na poziciji ("+ postoji.x +"," + postoji.y +")");
                            });
                        }
                        else if(p.status=406)
                        {
                            alert("Pozicija zauzeta!");
                        }
                        else 
                        {
                            alert("Doslo je do greske prilikom dodavanja proizvoda");
                        }
                   
                })
                // console.log(temp);
                // console.log(proizvodjac);
                // //provera da li vec postoji

                // let proizvodPostoji=this.proizvodi.find(proizvod =>proizvod.naziv==naziv.value && proizvod.tip==tip.value 
                //     && proizvod.kolicina==kolicina.value && proizvod.cena==cena.value 
                //     && proizvod.x==a && proizvod.y==b);

                // if(proizvodPostoji)
                // {
                //     alert("Proizvod vec postoji.");
                // }
                // else
                // {
                //     this.proizvodi[a*this.m + b].azurirajProizvod(kolicina.value, naziv.value, tip.value, a, b, cena.value, proizvodjac);

                //     if(boje!=null)
                //     {
                //     boje.forEach(element => {
                //         this.proizvodi[a*this.m+b].dodajBoju(element);
                //     })
                //     }

                    

                // }
                naziv.value="";
                tip.value="";
                cena.value="";
                kolicina.value="";
                pomocniDivZaBoje.innerHTML="";
                boje.splice(0, boje.length);



                // boje.forEach(element => {
                //     this.proizvodi[a*this.m+b].dodajBoju(element);
                // });
                // this.proizvodi[a*this.m+b].dodajBoju(boja);
                

                
            }

            


        }

        //Update
        const dugmeUpdate=document.createElement("button");
        dugmeUpdate.innerHTML="Azuriraj proizvod";
        kontProizvod.appendChild(dugmeUpdate);
        let temp=0;

        dugmeUpdate.onclick=(ev)=>{
            
            
            dugmeUpdate.disabled=true;
            console.log("Update");
            let a=parseInt(selectX.value);
            let b=parseInt(selectY.value);
            console.log(a);
            console.log(b);
            console.log(this.proizvodi[a*this.m+b]);
            if(this.proizvodi[a*this.m+b].naziv=="")
            {
                //provera samo za naziv jer nikad ne moze biti dodat proizvod bez naziva

                alert("Ne postoji proizvod na poziciji: (" + a + "," + b +")");
            }
            else 
            {
                const naziv=this.kontejner.querySelector(".NazivProizvoda");
                const tip=this.kontejner.querySelector(".TipProizvoda");
                const cena=this.kontejner.querySelector(".Cena");
                const kolicina=this.kontejner.querySelector(".KolicinaProizvoda");

                naziv.value=this.proizvodi[a*this.m+b].naziv;
                tip.value=this.proizvodi[a*this.m+b].tip;
                cena.value=this.proizvodi[a*this.m+b].cena;
                kolicina.value=this.proizvodi[a*this.m+b].kolicina;

                dugme.innerHTML="Sacuvaj izmene";
                
            }
            
        }

        //Proizvodjaci
        //Dodavanje postojeceg proizvodjaca
        let divProizvodjac = document.createElement("div");
        let selectProizvodjac=document.createElement("select");
        
        selectProizvodjac.className="selectProizvodjac";
        labela=document.createElement("label");
        labela.innerHTML="Vec dodati proizvodjaci: ";
        divProizvodjac.appendChild(labela);
        divProizvodjac.appendChild(selectProizvodjac);
        

        this.azurirajSelectProizvodjac(selectProizvodjac);
        

        kontProizvod.appendChild(divProizvodjac);

    }

    azurirajSelectProizvodjac(selectProizvodjac)
    {
        console.log(selectProizvodjac);
        console.log(this.proizvodjaci.length);
        console.log(this.proizvodjaci);
        if(selectProizvodjac!=null)
        {
            var length = selectProizvodjac.options.length;
            for(let i=length-1;i>=0;i--)
            {
                selectProizvodjac.options[i]=null;
            }

            let opcijaProizvodjac=null;
            for(let i=0;i<this.proizvodjaci.length;i++)
            {
                opcijaProizvodjac=document.createElement("option");
                opcijaProizvodjac.innerHTML=this.proizvodjaci[i].ime;
                opcijaProizvodjac.value=this.proizvodjaci[i].ime;
                selectProizvodjac.appendChild(opcijaProizvodjac);
            }
        }

    }

    crtanjeProizvoda(host)
    {
        const kontProizvoda = document.createElement("div");
        kontProizvoda.className="kontejnerProizvoda";
        host.appendChild(kontProizvoda);

        let red;
        let proizvod;

        for(let i=0;i<this.n;i++)
        {
            red=document.createElement("div");
            red.className="red";
            kontProizvoda.appendChild(red);

            for(let j=0;j<this.m;j++)
            {
                proizvod=new Proizvod("","",0,i,j,"",0);
                this.dodajProizvod(proizvod);
                proizvod.crtaj(red);
            }
        }

    }
}