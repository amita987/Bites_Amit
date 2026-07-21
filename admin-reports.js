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


