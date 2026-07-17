const menuContainer = document.getElementById("menu-container");

menuData.forEach(category => {

    let html = `
        <h2>${category.category}</h2>

        <table border="1" cellpadding="10" cellspacing="0" width="100%">

            <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Item</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Final Price</th>
                <th>Quantity</th>
                <th>Add to Cart</th>
            </tr>
    `;

    category.items.forEach(item => {

        const finalPrice =
            item.price - (item.price * item.discount / 100);

        html += `

        <tr>

            <td>${item.id}</td>

            <td>
                <img src="${item.image}"
                     width="80">
            </td>

            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <td>${item.discount}% OFF</td>

            <td>₹${finalPrice}</td>

            <td>

                <button>-</button>

                1

                <button>+</button>

            </td>

            <td>

                <button>Add to Cart</button>

            </td>

        </tr>

        `;

    });

    html += "</table><br><br>";

    menuContainer.innerHTML += html;

});



