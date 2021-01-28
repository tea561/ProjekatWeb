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

        const naslov = document.createElement("h1");
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

        this.crtanjeFormeProizvodjac(forma);
        this.crtanjeFormeProizvod(forma);
        
        

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
            else if(kontakt.value=="")
            {
                alert("Uneti kontakt proizvodjaca!");

            }
            
            else
            {

                fetch("https://localhost:5001/Store/UpisProizvodjaca", {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "ime": naziv.value,
                        "adresa" : adresa.value,
                        "kontakt": kontakt.value
                    })
                }).then(p=> {
                    if(p.ok){
                        alert("Proizvodjac uspesno dodat!");
                        const pom = this.kontejner.querySelector(".selectProizvodjac");
                        this.azurirajSelectProizvodjac(pom);
                    }
                    else if(p.status==400){
                        alert("Proizvodjac vec postoji!");
                    }
                    else {
                        alert("Greska prilikom dodavanja prozivodjaca!");
                    }
                })
                naziv.value="";
                adresa.value="";
                kontakt.value="";

                
            }

        }


    }
    crtanjeFormeProizvod(host)
    {
        //console.log(this.proizvodjaci);
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

        const dugmeRead=document.createElement("button");
        dugmeRead.innerHTML="Informacije o proizvodjacu";
        kontProizvod.appendChild(dugmeRead);

        dugmeRead.onclick=(ev) =>{
            fetch("https://localhost:5001/Store/PreuzimanjeProizvodjaca").then(p=>{
                p.json().then(data=>{
                    data.forEach(proizv=>{
                        if(proizv.ime ==selectProizvodjac.value)
                        {
                            let temp="Proizvodjac: " + proizv.ime + "\nAdresa: " + proizv.adresa
                                    + "\nKontakt: " + proizv.kontakt;

                            alert(temp);
                        }
                    });
                });
            });
        }

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
        buttonColor.className="dugmeBoja";
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
                    
                    //console.log(boja);
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
            let temp=selectProizvodjac.value;
            let proizvodjac=this.proizvodjaci.find(p=>p.ime==temp);

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
            else if(temp==null) {
                alert("Nije izabran proizvodjac!");
            }
            else
            {

                let a=parseInt(selectX.value);
                let b=parseInt(selectY.value);


                //console.log("Select proizvodjac" + selectProizvodjac.value);
                //console.log(boje.length);
                let str = "";
                for(let i=0;i<boje.length-1;i++)
                {
                    str+=boje[i] + ",";
                }
                str+=boje[boje.length-1];
                //console.log(str);
                
             

                                
                console.log("PIDD");
                console.log(this.id);
                

                fetch("https://localhost:5001/Store/UpisProizvoda/" + this.id, {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        "naziv": naziv.value,
                        "tip": tip.value,
                        "cena": cena.value,
                        "kolicina" : kolicina.value,
                        "x" : a,
                        "y": b,
                        "idProizvodjac":proizvodjac.id,
                        "boje":boje
                        
                        })
                    }).then(p=>{
                        if(p.ok){
                            // console.log(naziv.value);
                            // console.log(tip.value);
                            // console.log(kolicina.value);
                            // console.log(cena.value);
                            this.proizvodi[a*this.m + b].azurirajProizvod(kolicina.value, naziv.value, tip.value, a, b, cena.value, proizvodjac);
                            if(boje!=null)
                            {
                                console.log("DODAVANJE BOJE");
                                boje.forEach(element => {
                                    this.proizvodi[a*this.m+b].dodajBoju(element);
                                })
                            }
                            naziv.value="";
                            tip.value="";
                            cena.value="";
                            kolicina.value="";
                            pomocniDivZaBoje.innerHTML="";
                            boje.splice(0, boje.length);

                        }
                        else if(p.status==400)
                        {
                            const postoji={x:0, y:0};
                            p.json().then(q=> {
                                postoji.x=q.x;
                                postoji.y=q.y;
                                alert("Proizvod postoji u katalogu na poziciji ("+ postoji.x +"," + postoji.y +")");
                            });
                            alert("GRESKA");
                        }
                        else if(p.status==406)
                        {
                            alert("Pozicija zauzeta!");
                        }
                        else 
                        {
                            alert("Doslo je do greske prilikom dodavanja proizvoda");
                        }
                   
                })
        
            }

            


        }

        //Update
        const dugmeUpdate=document.createElement("button");
        dugmeUpdate.innerHTML="Azuriraj proizvod";
        kontProizvod.appendChild(dugmeUpdate);
        
        dugmeUpdate.onclick=(ev)=>{
            dugme.disabled=true;
            sacuvajIzmene.disabled=false;
            dugmeUpdate.disabled=true;
            //console.log("Update");
            let a=parseInt(selectX.value);
            let b=parseInt(selectY.value);
            // console.log(a);
            // console.log(b);
            // console.log(this.proizvodi[a*this.m+b]);
            if(this.proizvodi[a*this.m+b].naziv=="")
            {
                //provera samo za naziv jer nikad ne moze biti dodat proizvod bez naziva

                alert("Ne postoji proizvod na poziciji: (" + a + "," + b +")");
                dugme.disabled=false;
                dugmeUpdate.disabled=false;
            }
           
            const naziv=this.kontejner.querySelector(".NazivProizvoda");
            const tip=this.kontejner.querySelector(".TipProizvoda");
            const cena=this.kontejner.querySelector(".Cena");
            const kolicina=this.kontejner.querySelector(".KolicinaProizvoda");

            naziv.value=this.proizvodi[a*this.m+b].naziv;
            tip.value=this.proizvodi[a*this.m+b].tip;
            cena.value=this.proizvodi[a*this.m+b].cena;
            kolicina.value=this.proizvodi[a*this.m+b].kolicina;
            selectProizvodjac.value=this.proizvodi[a*this.m+b].proizvodjac.ime;
           
        }

            const sacuvajIzmene=document.createElement("button");
            sacuvajIzmene.innerHTML="Sacuvaj izmene";
            kontProizvod.appendChild(sacuvajIzmene);
            sacuvajIzmene.disabled=true;

            sacuvajIzmene.onclick=(ev)=>{
                dugme.disabled=false;
                dugmeUpdate.disabled=false;
                sacuvajIzmene.disabled=true;
                let a=parseInt(selectX.value);
                let b=parseInt(selectY.value);
                const naziv=this.kontejner.querySelector(".NazivProizvoda");
                const tip=this.kontejner.querySelector(".TipProizvoda");
                const cena=this.kontejner.querySelector(".Cena");
                const kolicina=this.kontejner.querySelector(".KolicinaProizvoda");
                let pom=selectProizvodjac.value;
                let proizvodjac2=this.proizvodjaci.find(p=>p.ime==pom);
                
               

                fetch("https://localhost:5001/Store/AzuriranjeProizvoda/" + this.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"

                     },
                    body: JSON.stringify ({
                        "naziv": naziv.value,
                        "tip": tip.value,
                        "cena": cena.value,
                        "kolicina" : kolicina.value,
                        "x" : a,
                        "y": b,
                        "idProizvodjac":proizvodjac2.id,
                        "boje":boje
                    
                    })
                }).then(p=>{

                    if(p.ok){
                        this.proizvodi[a*this.m+b].azurirajProizvod(kolicina.value, naziv.value,tip.value, a, b, cena.value, proizvodjac2);
                        if(boje!=null)
                            {
                                boje.forEach(element => {
                                    this.proizvodi[a*this.m+b].dodajBoju(element);
                                })
                            }
                            naziv.value="";
                            tip.value="";
                            cena.value="";
                            kolicina.value="";
                            pomocniDivZaBoje.innerHTML="";
                            boje.splice(0, boje.length);

                    }
                    else 
                    {
                        alert("Doslo je do greske prilikom azuriranja!");
                    }
                });
                
            }
            
        //DELETE
        const dugmeDelete=document.createElement("button");
        dugmeDelete.innerHTML="Obrisi";
        kontProizvod.appendChild(dugmeDelete);

        dugmeDelete.onclick=(ev) =>{
            let a=parseInt(selectX.value);
            let b=parseInt(selectY.value);
            console.log("BRISANJE");
            console.log(this.proizvodi[a*this.m+b].boje);

            fetch("https://localhost:5001/Store/BrisanjeProizvoda/"+this.id , {
                method:"DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "idkat":this.id,
                    "x":a,
                    "y":b
                })

            }).then(p=>{
                if(p.ok)
                {
                    this.proizvodi[a*this.m+b].azurirajProizvod(0,"","",a,b,0,null);
                }
                else if(p.status==406)
                {
                    alert("Pogresna lokacija proizvoda!");
                }
                else
                {
                    alert("Greska prilikom brisanja proizvoda!");
                }
            });
        }
        

        // //Proizvodjaci
        // //Dodavanje postojeceg proizvodjaca


        // let divProizvodjac = document.createElement("div");
        // let selectProizvodjac=document.createElement("select");
        
        // selectProizvodjac.className="selectProizvodjac";
        // labela=document.createElement("label");
        // labela.innerHTML="Vec dodati proizvodjaci: ";
        // divProizvodjac.appendChild(labela);
        // divProizvodjac.appendChild(selectProizvodjac);
     
        // this.azurirajSelectProizvodjac(selectProizvodjac);
        

        // kontProizvod.appendChild(divProizvodjac);

        // const dugmeRead=document.createElement("button");
        // dugmeRead.innerHTML="Informacije o proizvodjacu";
        // kontProizvod.appendChild(dugmeRead);

        // dugmeRead.onclick=(ev) =>{
        //     fetch("https://localhost:5001/Store/PreuzimanjeProizvodjaca").then(p=>{
        //         p.json().then(data=>{
        //             data.forEach(proizv=>{
        //                 if(proizv.ime ==selectProizvodjac.value)
        //                 {
        //                     let temp="Proizvodjac: " + proizv.ime + "\nAdresa: "
        //                             + "\nKontakt: " + proizv.kontakt;

        //                     alert(temp);
        //                 }
        //             });
        //         });
        //     });
        // }

    }

    azurirajSelectProizvodjac(selectProizvodjac)
    {
        var length = selectProizvodjac.options.length;
        for(let i=length-1;i>=0;i--)
        {
            selectProizvodjac.options[i]=null;
        }
        let opcijaProizvodjac=null;
        opcijaProizvodjac=document.createElement("option");
        opcijaProizvodjac.innerHTML="";
        opcijaProizvodjac.value=null;
        selectProizvodjac.appendChild(opcijaProizvodjac);

        fetch("https://localhost:5001/Store/PreuzimanjeProizvodjaca").then(p=> {
            p.json().then(data=>{
                data.forEach(proizvodjac => {
                    //console.log(proizvodjac.id);
                    //console.log(proizvodjac.ime);
                    //console.log(proizvodjac.adresa);
                    //console.log(proizvodjac.kontakt);
                    
                    const temp = new Proizvodjac(proizvodjac.id, proizvodjac.ime, proizvodjac.adresa, proizvodjac.kontakt);
                    
                    
                    this.dodajProizvodjaca(temp);

                    opcijaProizvodjac=document.createElement("option");
                    opcijaProizvodjac.innerHTML=temp.ime;
                    opcijaProizvodjac.value=temp.ime;
                    selectProizvodjac.appendChild(opcijaProizvodjac);
                });
            });
        });

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