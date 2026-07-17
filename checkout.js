/* ==========================================================
   LOAD CHECKOUT SUMMARY
   ========================================================== */


let checkoutCart =
JSON.parse(localStorage.getItem("cart")) || [];



function loadCheckoutSummary(){


    const itemsBox =
    document.getElementById("checkout-items");


    if(!itemsBox){

        return;

    }



    let subtotal = 0;


    let html = "";



    checkoutCart.forEach(function(item){


        let price =
        Number(item.finalPrice.replace("₹",""));


        let total =
        price * item.quantity;



        subtotal += total;



        html += `

        <p>

        ${item.name}
        x
        ${item.quantity}

        =
        ₹${total}

        </p>

        `;


    });



    let discount = 0;


    if(subtotal >= 500){

        discount = 50;

    }



    let delivery = 40;



    let grandTotal =
    subtotal - discount + delivery;



    itemsBox.innerHTML = html;



    document.getElementById("checkout-subtotal").textContent = subtotal;


    document.getElementById("checkout-discount").textContent = discount;


    document.getElementById("checkout-delivery").textContent = delivery;


    document.getElementById("checkout-total").textContent = grandTotal;


}



loadCheckoutSummary();




function placeOrder(){


    let name =
    document.getElementById("customer-name").value;


    let mobile =
    document.getElementById("mobile").value;


    let address =
    document.getElementById("address").value;



    if(name==="" || mobile==="" || address===""){


        alert("Please fill all required details");

        return;

    }



    alert(
        "Order placed successfully!"
    );


}
