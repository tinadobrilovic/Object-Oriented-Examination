//debugger;
'use strict';

class Item {
    constructor(price, name) {
        this.price = price;
        this.name = name;
    }

    getPrice() {
        return this.price;
    }
    
    getName() {
        return this.name;
    }

    //Hej Hej
}

class Snack extends Item {
    constructor(price, name, weight) {
        super(price, name);
        this.weight = weight;
    }

    getSnackWeight() {
        return this.weight;
    }

}

class Drink extends Item {
    constructor(price, name, volume, type) {
        super(price, name);
        this.volume = volume;
        this.type = type
    }

    getType() {
        return this.type;
    }
    
    getVolume() {
        return this.volume;
    }

}

class Receipt {
    constructor(date) {
        this.date = date
        this.orderitems = [];
        this.numberofitems = [];
        this.dineOption = "";
    }



    printReceipt() {
        let receiptContainer = document.getElementById("receiptContainer"); //hämtar ett html element
        let total = 0; //initierar några värden
        let index=0; 
    
        this.orderitems.forEach(orderitem => { //går igenom alla orderitems i kvitton
            let p = document.createElement("p"); //skapar ett html element
            let number = this.numberofitems[index]; //hämtar från this.numberofitemslistan hur många öl/vin jag beställt
            let price = orderitem.price*number //beräknar pris * antal 
            let dineOption = this.dineOption
            p.innerText = `${number}st: ${orderitem.name}: ${price} kr: ${dineOption}`; //här sätter själva textsträngen
            receiptContainer.appendChild(p); //Lägger till p i receiptcontainer
            total += price; //ökar priset
        });
        let totalP = document.createElement("p");//skapar elementet
        totalP.innerText = `Totalt: ${total} kr`; //ändrar texten
        receiptContainer.appendChild(totalP); //lägger till total p i containern
    }

    addToOrder(item, antal, leverans) { //lägger till beställningar
        this.orderitems.push(item) 
        this.numberofitems.push(antal)
        this.dineOption= leverans
    }

}

class Bar {
    constructor() {
        
        //lägg till mer i menyn här
        this.menu = [
            new Drink(60, 'Öl', '33cl','Alkohol'),
            new Drink(95, 'Vin', '25cl','Alkohol'),
            new Drink(95, 'Whiskey', '4cl','Alkohol'),
            new Drink(60, 'Cider', '25cl','Alkohol'),
            new Drink(80, 'Shots', '4cl','Alkohol'),

            new Drink(95, 'Negroni', '35cl','Cocktails'),
            new Drink(95, 'Dry Martini', '35cl','Cocktails'),
            new Drink(95, 'Daiquiri', '35cl','Cocktails'),
            new Drink(95, 'Old Fashioned', '35cl','Cocktails'),
            new Drink(95, 'Mojito', '35cl','Cocktails'),
            new Drink(80, 'Margarita', '35cl','Cocktails'),

            new Drink(25, 'Coca-cola', '50cl', 'Alkoholfritt'),
            new Drink(25, 'Fanta', '50cl', 'Alkoholfritt'),
            new Drink(25, 'Sprite', '50cl', 'Alkoholfritt'),
            new Drink(25, 'Coca-cola Zero', '50cl', 'Alkoholfritt'),
            new Drink(25, 'Pommac', '50cl', 'Alkoholfritt'),
            new Drink(80, 'Virgin Mojito', '35cl','Alkoholfritt'),
            new Drink(80, 'Virgin Pina Colada', '35cl','Alkoholfritt'),
            new Drink(80, 'Virgin Negroni', '35cl','Alkoholfritt'),
            new Drink(80, 'Shirley Temple', '35cl','Alkoholfritt'),
            new Drink(80, 'Virgin Strawberry Daiquiri', '35cl','Alkoholfritt'),
           
            
            new Snack(50, 'Jordnötter', '200 g'),
            new Snack(50, 'Oliver', '200 g'),
            new Snack(40, 'Chips', '250 g'),
            new Snack(90, 'Ostbricka', '250 g'),
            new Snack(120, 'Charkuteribricka', '300 g'),
        ];  // fyller listan med objekt som representerar produkter
            // this.order = new Order(); // Skapar ett beställningsobjekt

      
        this.order = []; // SKAPA 2 ARRAYS ANVÄNDS nu
        this.receipt = new Receipt();
        this.receipts = []; // Måste vara definierad här
    }

    printMenu() {
        let drinksmenu = document.getElementById("dryckesmeny"); //vår ul för drycker
        let snacksmenu = document.getElementById("snacksmeny"); // vår ul för våra snacks
        let menyval = document.getElementById("drycktyp");
        let menyvalValue = menyval.value;

        drinksmenu.innerHTML = ""; //tömmer drinksmenu så att där inte står någonting
        snacksmenu.innerHTML = ""; 

        this.menu.forEach(item => {
            let li = document.createElement('li');
            //console.log("innnan if satsen")
            if (item instanceof Drink) {
                if (item.getType()=="Alkohol" && menyvalValue == 'Alkohol'){
                li.innerText = `${item.name} - ${item.price} kr - ${item.volume}`;
                drinksmenu.appendChild(li);
                }
            else if (item.getType()=="Cocktails" && menyvalValue == 'Cocktails'){
                li.innerText = `${item.name} - ${item.price} kr - ${item.volume}`;
                drinksmenu.appendChild(li);
                }
            else if (item.getType()=="Alkoholfritt" && menyvalValue == 'Alkoholfritt'){
                li.innerText = `${item.name} - ${item.price} kr - ${item.volume}`;
                drinksmenu.appendChild(li);

                }
            else if (menyvalValue == 'All'){
                li.innerText = `${item.name} - ${item.price} kr - ${item.volume}`;
                drinksmenu.appendChild(li);

                }
                //console.log("innnan return i printmenu")
                return true;
    
            }

        });
    
        this.menu.forEach(item => {
            let li = document.createElement('li'); 
            if (item instanceof Snack) {
            li.innerText = `${item.name} - ${item.price} kr - ${item.weight}`;
            snacksmenu.appendChild(li);
            }
        });
    }

    controll(event) { //gula är metoder
        event.preventDefault(); //javascript grej så att det inte sker två ggr på varandra

        let product = document.getElementById("produkt").value;
        let antal = document.getElementById("antal").value;
        let dineOption = document.getElementById("dineOption").value;
        let foundItem=-1;
       
        for (let i=0;(i < this.menu.length); i++){
            if(this.menu[i].name.toLowerCase()==product.toLowerCase()){ //om meny item matchar det jag har skrivit in typ produkten så sätter den att founditem är rätt i index.
            foundItem =i;
            }
        }
       
        let bestallningar = document.getElementById("bestallningar");
        let li = document.createElement('li');
        if (foundItem > -1) {  //har vi hittat det vi söker i menyn. Matchar det
            
            this.order.push(this.menu[foundItem]) //pusjar in i arrayn
            this.order.push(antal)
            this.order.push(dineOption) 
            li.innerText = `${antal} st ${this.menu[foundItem].name} ${this.menu[foundItem].getPrice() * antal} kr ${dineOption}`; //skriver ut visuellt
            bestallningar.appendChild(li)
    
        } else {
            alert(`${product} finns inte i menyn.`);
        }
    }   
    createReceipt(){
        for (let i=0; (i< this.order.length); i=i+3){
            this.receipt.addToOrder(this.order[i], this.order[i+1], this.order[i+2]); //Här lägger till allt som finns i ordern till kvittot.
        }
        this.reset() //tömmer i ordern och html

        this.receipt.printReceipt();
        this.receipts.push(this.receipt);

        this.receipt = new Receipt(Date);
    }
    showAllReceipts(){
        let receiptContainer = document.getElementById("receiptContainer");
        receiptContainer.innerHTML = "";
        let receiptnumber = 1
        this.receipts.forEach(receipt => { //går igenom alla kvitton
            let li = document.createElement('li'); //skriver kvittonumber
            li.innerText = "Kvitto : "+ receiptnumber
            receiptnumber++
            receiptContainer.appendChild(li)
            receipt.printReceipt()
        })
    }
    reset(){
        let receiptContainer = document.getElementById("receiptContainer"); //här hittar receiptContainer elementet. Nästa rad tömms kvitto kvittot endast i html
        receiptContainer.innerHTML = ""; 

        let bestallningar = document.getElementById("bestallningar"); //här hittar bastallningar och nästa rad tömms beställningar i html
        bestallningar.innerHTML = "";

        let product = document.getElementById("produkt"); //här hittas värdena i html
        let antal = document.getElementById("antal");
        product.value="";
        antal.value="";

        this.order = []; // Tömmer ordern i javascript. Datamässig erase
    }
}

let baren = new Bar(); //här skapar första objekt

document.getElementById("createReceipt").addEventListener("click", function(event) {
    baren.createReceipt(); // de här är till för att skapa click funktionalitet
});

document.getElementById("allakvittoBtn").addEventListener("click", function(event) {
    baren.showAllReceipts();
});

document.getElementById("bestallKnapp").addEventListener("click", function(event) {
    baren.controll(event);
});

document.getElementById("drycktyp").addEventListener("change", function() {
    baren.printMenu();
});

document.getElementById("Reset").addEventListener("click", function() {
    baren.reset();
});