/* =====================================================
   Reports & Dashboard

   This file contains all report calculations.

   Reports are ALWAYS calculated from:

   1. restaurantOrders
   2. purchaseRegister

   Nothing is stored separately.
===================================================== */



/* =====================================================
   Reports & Dashboard

   This file contains all report calculations.

   Reports are ALWAYS calculated from:

   1. restaurantOrders
   2. purchaseRegister

   Nothing is stored separately.
===================================================== */



/* =====================================================
   Page Loaded
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        // Connect all button events
        initializeReportFilters();

    }

);



/* =====================================================
   Initialize Report Filter Buttons
===================================================== */

function initializeReportFilters() {

    document
        .getElementById("todayBtn")
        .addEventListener("click", setToday);

    document
        .getElementById("yesterdayBtn")
        .addEventListener("click", setYesterday);

    document
        .getElementById("thisWeekBtn")
        .addEventListener("click", setThisWeek);

    document
        .getElementById("lastWeekBtn")
        .addEventListener("click", setLastWeek);

    document
        .getElementById("thisMonthBtn")
        .addEventListener("click", setThisMonth);

    document
        .getElementById("lastMonthBtn")
        .addEventListener("click", setLastMonth);

    document
        .getElementById("thisYearBtn")
        .addEventListener("click", setThisYear);

    document
        .getElementById("lastYearBtn")
        .addEventListener("click", setLastYear);

      /* ------------------------------------------
      Generate Report Button
   ------------------------------------------ */
   
   document
       .getElementById("generateReportBtn")
       .addEventListener("click", generateReport);

   /* ------------------------------------------
      Daily Report Button
   ------------------------------------------ */
   
   document
       .getElementById("dailyReportBtn")
       .addEventListener("click", openDailyReport);

   document
    .getElementById("backToReportsBtn")
    .addEventListener("click", showMainReports);
   
   /* ------------------------------------------
      Daily Report Settings
   ------------------------------------------ */
   
   document
       .getElementById("reportSettingsBtn")
       .addEventListener("click", openReportSettings);
   
   document
       .getElementById("closeSettingsBtn")
       .addEventListener("click", closeReportSettings);
   /* ------------------------------------------
      Daily Report Button
   ------------------------------------------ */
   
   document
       .getElementById("dailyReportBtn")
       .addEventListener("click", openDailyReport);
   
   
   /* ------------------------------------------
      Report Settings
   ------------------------------------------ */
   
   document
       .getElementById("reportSettingsBtn")
       .addEventListener("click", openReportSettings);
   
   document
       .getElementById("closeSettingsBtn")
       .addEventListener("click", closeReportSettings);
}



/* =====================================================
   Helper Function

   Convert Date object into YYYY-MM-DD
===================================================== */

function formatDate(date) {

    return date.toISOString().split("T")[0];

}



/* =====================================================
   Helper Function

   Update Date Inputs
===================================================== */

function updateDateInputs(fromDate, toDate) {

    document.getElementById("fromDate").value = fromDate;

    document.getElementById("toDate").value = toDate;

}



/* =====================================================
   Today
===================================================== */

function setToday() {

    const today = new Date();

    const date = formatDate(today);

    updateDateInputs(date, date);

}



/* =====================================================
   Yesterday
===================================================== */

function setYesterday() {

    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    const date = formatDate(yesterday);

    updateDateInputs(date, date);

}



/* =====================================================
   This Week (Monday to Today)
===================================================== */

function setThisWeek() {

    const today = new Date();

    const firstDay = new Date(today);

    const day = firstDay.getDay();

    const difference = day === 0 ? 6 : day - 1;

    firstDay.setDate(firstDay.getDate() - difference);

    updateDateInputs(

        formatDate(firstDay),

        formatDate(today)

    );

}



/* =====================================================
   Last Week (Monday to Sunday)
===================================================== */

function setLastWeek() {

    const today = new Date();

    const start = new Date(today);

    const day = start.getDay();

    const difference = day === 0 ? 6 : day - 1;

    start.setDate(start.getDate() - difference - 7);

    const end = new Date(start);

    end.setDate(start.getDate() + 6);

    updateDateInputs(

        formatDate(start),

        formatDate(end)

    );

}



/* =====================================================
   This Month
===================================================== */

function setThisMonth() {

    const today = new Date();

    const first = new Date(

        today.getFullYear(),

        today.getMonth(),

        1

    );

    updateDateInputs(

        formatDate(first),

        formatDate(today)

    );

}



/* =====================================================
   Last Month
===================================================== */

function setLastMonth() {

    const today = new Date();

    const first = new Date(

        today.getFullYear(),

        today.getMonth() - 1,

        1

    );

    const last = new Date(

        today.getFullYear(),

        today.getMonth(),

        0

    );

    updateDateInputs(

        formatDate(first),

        formatDate(last)

    );

}



/* =====================================================
   This Year
===================================================== */

function setThisYear() {

    const today = new Date();

    const first = new Date(

        today.getFullYear(),

        0,

        1

    );

    updateDateInputs(

        formatDate(first),

        formatDate(today)

    );

}



/* =====================================================
   Last Year
===================================================== */

function setLastYear() {

    const year = new Date().getFullYear() - 1;

    const first = new Date(year, 0, 1);

    const last = new Date(year, 11, 31);

    updateDateInputs(

        formatDate(first),

        formatDate(last)

    );

}

/* =====================================================
   Generate Report

   1. Validate selected dates
   2. Display report period
   3. (Financial calculations will be added next)
===================================================== */

function generateReport() {

    /* ------------------------------------------
       Read selected dates
    ------------------------------------------ */

    const fromDate =
        document.getElementById("fromDate").value;

    const toDate =
        document.getElementById("toDate").value;


    /* ------------------------------------------
       Validate dates
    ------------------------------------------ */

    if (fromDate === "" || toDate === "") {

        alert("Please select both From Date and To Date.");

        return;

    }


    if (fromDate > toDate) {

        alert("From Date cannot be later than To Date.");

        return;

    }


    /* ------------------------------------------
       Display selected report period
    ------------------------------------------ */

    document.getElementById("displayFromDate").textContent = fromDate;

    document.getElementById("displayToDate").textContent = toDate;


   /* ==========================================================
      READ CUSTOMER ORDERS
   
      PURPOSE:
      Loads all saved customer orders.
   
   ========================================================== */
   
   const orders =
   
       JSON.parse(
   
           localStorage.getItem("orders")
   
       ) || [];
   
   
   /* ==========================================================
      FILTER ORDERS
   
      PURPOSE:
      Keep only the orders within the selected
      reporting period.
   
   ========================================================== */
   
   const filteredOrders =
   
       orders.filter(function(order){
   
           return(
   
               order.orderDateValue >= fromDate
   
               &&
   
               order.orderDateValue <= toDate
   
           );
   
       });
   
   
   /* ==========================================================
      READ PURCHASE REGISTER
   
   ========================================================== */
   
   const purchaseRegister =
   
       JSON.parse(
   
           localStorage.getItem("purchaseRegister")
   
       ) || [];
   
   
   /* ==========================================================
      FILTER PURCHASES
   
   ========================================================== */
   
   const filteredPurchases =
   
       purchaseRegister.filter(function(purchase){
   
           return(
   
               purchase.purchaseDate >= fromDate
   
               &&
   
               purchase.purchaseDate <= toDate
   
           );
   
       });
   

   /* ==========================================================
      GENERATE FINANCIAL SUMMARY
   
   ========================================================== */
   
   generateFinancialSummary(
   
       filteredOrders,
   
       filteredPurchases
   
   );
   

   /* ==========================================================
      GENERATE BEST SELLING ITEMS
   
   ========================================================== */
   
   generateBestSellingItems(
   
       filteredOrders
   
   );
   
   
   /* ==========================================================
      GENERATE INGREDIENT PURCHASE SUMMARY
   
      PURPOSE:
      Calculates the purchase summary for all
      ingredients purchased during the selected
      reporting period.
   
   ========================================================== */
   
   generateIngredientPurchaseSummary(
   
       filteredPurchases
   
   );

}


/* ==========================================================
   GENERATE FINANCIAL SUMMARY

   PURPOSE:
   Calculates every financial figure for the
   selected reporting period.

========================================================== */

function generateFinancialSummary(

    filteredOrders,

    filteredPurchases

){

    /* ------------------------------------------
       Initialize Totals
    ------------------------------------------ */

    let totalOrders = 0;

    let totalRevenue = 0;

    let totalPurchaseCost = 0;

    let totalDeliveryCharges = 0;

    let totalTax = 0;


    /* ------------------------------------------
       Calculate Order Totals
    ------------------------------------------ */

    totalOrders = filteredOrders.length;


    filteredOrders.forEach(function(order){

        totalRevenue += Number(order.total || 0);

        totalDeliveryCharges += Number(order.delivery || 0);

        totalTax += Number(order.taxAmount || 0);

    });


    /* ------------------------------------------
       Calculate Purchase Totals
    ------------------------------------------ */

    filteredPurchases.forEach(function(purchase){

        totalPurchaseCost += Number(purchase.totalCost || 0);

    });


    /* ------------------------------------------
       Calculate Derived Values
    ------------------------------------------ */

    const revenueAfterDelivery =

        totalRevenue -

        totalDeliveryCharges;


    const revenueAfterDeliveryAndTax =

        totalRevenue

        -

        totalDeliveryCharges

        -

        totalTax;


    const averageOrderValue =

        totalOrders === 0

        ?

        0

        :

        totalRevenue / totalOrders;


    /* ------------------------------------------
       Display Financial Summary
    ------------------------------------------ */

    document.getElementById(

        "financialSummary"

    ).innerHTML =

    `

    <h2>Financial Summary</h2>

    <table border="1" cellpadding="8">

        <tr>

            <th>Description</th>

            <th>Amount</th>

        </tr>

        <tr>

            <td>Total Orders</td>

            <td>${totalOrders}</td>

        </tr>

        <tr>

            <td>Total Revenue</td>

            <td>₹${totalRevenue.toFixed(2)}</td>

        </tr>

        <tr>

            <td>Total Ingredient Purchase Cost</td>

            <td>₹${totalPurchaseCost.toFixed(2)}</td>

        </tr>

        <tr>

            <td>Total Delivery Charges</td>

            <td>₹${totalDeliveryCharges.toFixed(2)}</td>

        </tr>

        <tr>

            <td>Total Tax</td>

            <td>₹${totalTax.toFixed(2)}</td>

        </tr>

        <tr>

            <td>Revenue after Delivery Charges</td>

            <td>₹${revenueAfterDelivery.toFixed(2)}</td>

        </tr>

        <tr>

            <td>Revenue after Delivery Charges & Tax</td>

            <td>₹${revenueAfterDeliveryAndTax.toFixed(2)}</td>

        </tr>

        <tr>

            <td>Average Order Value</td>

            <td>₹${averageOrderValue.toFixed(2)}</td>

        </tr>

    </table>

    `;

}

/* ==========================================================
   GENERATE BEST SELLING ITEMS

   PURPOSE:
   Calculates the Top 10 selling menu items from
   all customer orders within the selected period.

   DATA SOURCE:
   filteredOrders

========================================================== */

function generateBestSellingItems(

    filteredOrders

){

    /* ------------------------------------------
       Store quantity sold for every menu item

       Example:

       {
           "Veg Burger": 12,
           "Pizza": 20
       }

    ------------------------------------------ */

    const itemSales = {};


    /* ------------------------------------------
       Read every customer order

    ------------------------------------------ */

    filteredOrders.forEach(function(order){

        /* --------------------------------------
           Skip invalid orders
        -------------------------------------- */

        if(!order.items){

            return;

        }


        /* --------------------------------------
           Read every ordered menu item
        -------------------------------------- */

        order.items.forEach(function(item){

            const itemName = item.name;

            const quantity = Number(item.quantity || 0);


            if(!itemSales[itemName]){

                itemSales[itemName] = 0;

            }


            itemSales[itemName] += quantity;

        });

    });


    /* ------------------------------------------
       Convert object into sortable array

    ------------------------------------------ */

    const salesArray =

        Object.entries(itemSales)

        .map(function(entry){

            return{

                name: entry[0],

                quantity: entry[1]

            };

        });


    /* ------------------------------------------
       Sort by highest quantity sold

    ------------------------------------------ */

    salesArray.sort(function(a,b){

        return b.quantity - a.quantity;

    });


    /* ------------------------------------------
       Keep only Top 10 items

    ------------------------------------------ */

    const topItems =

        salesArray.slice(0,10);


    /* ------------------------------------------
       Build report table

    ------------------------------------------ */

    let html =

    `

    <h2>Best Selling Items (Top 10)</h2>

    <table border="1" cellpadding="8">

        <tr>

            <th>Rank</th>

            <th>Menu Item</th>

            <th>Total Quantity Sold</th>

        </tr>

    `;


    /* ------------------------------------------
       Add rows

    ------------------------------------------ */

    if(topItems.length===0){

        html +=

        `

        <tr>

            <td colspan="3">

                No orders found for this period.

            </td>

        </tr>

        `;

    }

    else{

        topItems.forEach(function(item,index){

            html +=

            `

            <tr>

                <td>${index + 1}</td>

                <td>${item.name}</td>

                <td>${item.quantity}</td>

            </tr>

            `;

        });

    }


    /* ------------------------------------------
       Close table

    ------------------------------------------ */

    html +=

    `

    </table>

    `;


    /* ------------------------------------------
       Display report

    ------------------------------------------ */

    document.getElementById(

        "bestSellingItems"

    ).innerHTML =

    html;

}

/* ==========================================================
   GENERATE INGREDIENT PURCHASE SUMMARY

   PURPOSE:
   Groups purchases by ingredient and
   calculates:

   1. Number of Purchases
   2. Total Purchase Cost

   DATA SOURCE:
   filteredPurchases

========================================================== */

function generateIngredientPurchaseSummary(

    filteredPurchases

){

    /* ------------------------------------------
       Store Purchase Summary

       Example:

       {

           "Tomato":{

               purchaseCount:2,

               totalCost:450

           }

       }

    ------------------------------------------ */

    const ingredientSummary = {};


    /* ------------------------------------------
       Read Every Purchase

    ------------------------------------------ */

    filteredPurchases.forEach(function(purchase){

        const ingredientName =

            purchase.ingredientName;


        const totalCost =

            Number(

                purchase.totalCost || 0

            );


        /* --------------------------------------
           Create Ingredient

        -------------------------------------- */

        if(!ingredientSummary[ingredientName]){

            ingredientSummary[ingredientName] = {

                purchaseCount : 0,

                totalCost : 0

            };

        }


        /* --------------------------------------
           Update Totals

        -------------------------------------- */

        ingredientSummary[ingredientName]

        .purchaseCount++;


        ingredientSummary[ingredientName]

        .totalCost += totalCost;

    });


    /* ------------------------------------------
       Convert Object to Array

    ------------------------------------------ */

    const summaryArray =

        Object.entries(

            ingredientSummary

        )

        .map(function(entry){

            return{

                ingredientName :

                    entry[0],

                purchaseCount :

                    entry[1].purchaseCount,

                totalCost :

                    entry[1].totalCost

            };

        });


    /* ------------------------------------------
       Sort by Highest Purchase Cost

    ------------------------------------------ */

    summaryArray.sort(function(a,b){

        return(

            b.totalCost -

            a.totalCost

        );

    });


    /* ------------------------------------------
       Build HTML

    ------------------------------------------ */

    let html =

    `

    <h2>

        Ingredient Purchase Summary

    </h2>

    <table border="1" cellpadding="8">

        <tr>

            <th>

                Ingredient

            </th>

            <th>

                Number of Purchases

            </th>

            <th>

                Total Purchase Cost

            </th>

        </tr>

    `;


    /* ------------------------------------------
       Display Data

    ------------------------------------------ */

    if(summaryArray.length === 0){

        html +=

        `

        <tr>

            <td colspan="3">

                No purchases found for this period.

            </td>

        </tr>

        `;

    }

    else{

        summaryArray.forEach(function(item){

            html +=

            `

            <tr>

                <td>

                    ${item.ingredientName}

                </td>

                <td>

                    ${item.purchaseCount}

                </td>

                <td>

                    ₹${item.totalCost.toFixed(2)}

                </td>

            </tr>

            `;

        });

    }


    /* ------------------------------------------
       Close Table

    ------------------------------------------ */

    html +=

    `

    </table>

    `;


    /* ------------------------------------------
       Display Report

    ------------------------------------------ */

    document

    .getElementById(

        "ingredientPurchaseSummary"

    )

    .innerHTML =

    html;

}

/* =====================================================
   Open Daily Report
===================================================== */

function openDailyReport() {

    document.getElementById("reportFilters").style.display = "none";

    document.getElementById("reportPeriod").style.display = "none";

    document.getElementById("financialSummary").style.display = "none";

    document.getElementById("bestSellingItems").style.display = "none";

    document.getElementById("ingredientPurchaseSummary").style.display = "none";

    document.getElementById("dailyReportSection").style.display = "block";

}


/* =====================================================
   Open Report Settings
===================================================== */

function openReportSettings() {

    document.getElementById("reportSettingsModal").style.display = "flex";

}


/* =====================================================
   Close Report Settings
===================================================== */

function closeReportSettings() {

    document.getElementById("reportSettingsModal").style.display = "none";

}


/* =====================================================
   OPEN DAILY REPORT
===================================================== */

function openDailyReport() {

    document.getElementById("reportFilters").style.display = "none";

    document.getElementById("reportPeriod").style.display = "none";

    document.getElementById("financialSummary").style.display = "none";

    document.getElementById("bestSellingItems").style.display = "none";

    document.getElementById("ingredientPurchaseSummary").style.display = "none";

    document.getElementById("dailyReportSection").style.display = "block";

}


/* =====================================================
   OPEN REPORT SETTINGS
===================================================== */

function openReportSettings() {

    document.getElementById("reportSettingsModal").style.display = "flex";

}


/* =====================================================
   CLOSE REPORT SETTINGS
===================================================== */

function closeReportSettings() {

    document.getElementById("reportSettingsModal").style.display = "none";

}
