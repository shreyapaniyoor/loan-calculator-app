document.getElementById("loan-form").addEventListener("submit", function (e) {
    document.getElementById("results").style.display = "none";
    document.getElementById("loading").style.display = "block";
    setTimeout(calculate, 2000);   //calling calculate() function display after 2seconds
    e.preventDefault();
  });
  
  function calculate(e) {
    //getting values from inputs
    const amount = document.getElementById("loan_amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly_payment");
    const totalAmount = document.getElementById("total_amount");
    const totalInterest = document.getElementById("total_interest");
  
    const principal = parseFloat(amount.value);  //converting input value from string to decimal(float value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12; 
    const calculatedPayments = parseFloat(years.value) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
  
    if (isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2); //setting value to input field and making decimal point fixed to 2
      totalAmount.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  
      document.getElementById("results").style.display = "block";
      document.getElementById("loading").style.display = "none";
    } else {
      showAlert("Please enter the amounts");
    }
    e.preventDefault();
  }
  
  function showAlert(error) {
    const errorDiv = document.createElement("div");   //creating div
  
    errorDiv.className = "alert alert-danger";   //bootstrap class to show alert in red
    errorDiv.appendChild(document.createTextNode(error)); 
    const card = document.querySelector(".card");  //selecting the classname
    const heading = document.querySelector(".heading");  //selecting the classname
  
    card.insertBefore(errorDiv, heading);   //inserting it before the heading
  
    //to discard the error after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();  //here removing is used discard
    }, 3000);
  }
  