class RapidTestOrder {
  constructor(sFrom) {
    this.OrderState = {
      WELCOMING: () => {
        let aReturn = [];
        this.stateCur = this.OrderState.RESERVING; 
        aReturn.push("Welcome to Hi Pizza.");
        aReturn.push("Would you like to reserve a pizza order?");
        return aReturn;
      },
      RESERVING: (sInput) => {
        let aReturn = [];
        if (sInput.toLowerCase().startsWith('y')) {
          this.stateCur = this.OrderState.ADDING_TOPPING; 
          aReturn.push(`Thank you for choosing Hi Pizza!`);
          aReturn.push("Would you like to add toppings to your pizza?"); 
        } else {
          aReturn.push("Thank you for considering Hi Pizza!");
          aReturn.push("Maybe next time");
          this.isDone = true; // jiehsu
        }
        return aReturn;
      },
      ADDING_TOPPING: (sInput) => {
        let aReturn = [];
        if (sInput.toLowerCase().startsWith('y')) {
          this.stateCur = this.OrderState.ADDING_DRINK; 
          aReturn.push("Great! What toppings would you like?");
        } else {
          this.stateCur = this.OrderState.RESERVING; 
          aReturn.push("No problem. Your order is being processed.");
          this.isDone = true; // jiehsu
        }
        return aReturn;
      },
      ADDING_DRINK: (sInput) => {
        let aReturn = [];
        if (sInput.trim() !== "") {
          aReturn.push(`You've added ${sInput} to your order.`);
        } else {
          aReturn.push("You haven't added any drink to your order.");
        }
        aReturn.push("Thank you for your order!");
        aReturn.push(`Your rapid test is reserved under the phone number ${this.sFrom}`);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 120);
        aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
        this.isDone = true; // jieshu
        return aReturn;
      }
    };

    this.stateCur = this.OrderState.WELCOMING;
    this.isDone = false;
    this.sFrom = sFrom;
  }

  handleInput(sInput) {
    return this.stateCur(sInput);
  }

  isDone() {
    return this.isDone;
  }
}

export { RapidTestOrder }
