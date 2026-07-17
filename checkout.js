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
