class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}

class Burger {
    constructor(size, filling, topping) {
        this.size = new Param(this._select(size));
        this.filling = new Param(this._select(filling));
        this.toppings = this._getToppings(topping);
    }

    _getToppings(name) {
        let result = [];
        this._selectAll(name).forEach(element => {
            let object = new Param(element);
            result.push(object);
        });
        return result;
    }

    _select(name) {
        return document.querySelector(
            `input[name=${name}]:checked`
        );
    }

    _selectAll(name) {
        return [...document.querySelectorAll(
            `input[name=${name}]:checked`
        )];
    }

    _sumPrice() {
        let result = this.size.price + this.filling.price;
        this.toppings.forEach(element => result += element.price);
        return result;
    }

    _sumCalories() {
        let result = this.size.calories + this.filling.calories;
        this.toppings.forEach(element => result += element.calories);
        return result;
    }

    showSum(price, calories) {
        document
            .querySelector(price)
            .textContent = this._sumPrice();

        document
            .querySelector(calories)
            .textContent = this._sumCalories();
    }
}

