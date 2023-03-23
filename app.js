// CLASS
let elementCount = 0

class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProducts(product) {
        // const productList = document.getElementById('product-list');
        const productList = document.getElementById('bodyModal')
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-3">
            <div class="card-body">
                <strong>Product Name</strong>: ${product.name}
                <br>
                <strong>Product Price</strong>: ${product.price}
                <br>
                <strong>Product Year</strong>: ${product.year}
                <br>
                <a href="#" class="btn btn-outline-danger mt-2" name="delete">Delete</a>
            </div>
        </div>
        `;
        productList.appendChild(element);



    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProducts(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product deleted Successfully', 'danger')
            elementCount--
            console.log(elementCount)
            const count = document.getElementById('count');
            count.innerHTML = elementCount
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} fixed-top opacity-75 text-center w-100`;
        div.appendChild(document.createTextNode(message));
        // SHOW in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 4000)
    }
}

// DOM EVENTS

document.getElementById("product-form")
    .addEventListener('submit', function (e) {
        const name = document.getElementById("name").value
        const price = document.getElementById("price").value
        const year = document.getElementById("year").value
        console.log(price, year, name);

        const product = new Product(name, price, year);

        elementCount++
        console.log(elementCount);




        const ui = new UI();

        if (name === '' || price === '' || year === '') {
            return ui.showMessage('Complete Fields Please', 'warning');
        }

        ui.addProducts(product);
        ui.resetForm();
        ui.showMessage('Product Added Successfully', 'success')

        e.preventDefault();


        const count = document.getElementById('count');
        count.innerHTML = elementCount
    })

document.getElementById('product-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProducts(e.target);
})


