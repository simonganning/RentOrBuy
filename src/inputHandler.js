// ---------------------------
// input values
let rentIncreaseRENT = 0;
let rentCostRENT = 0;

let buyAmountBUY = 0;
let interestRate = 0;
let downPaymentBUY = 0;
let monthlyCostsBUY = 0;
let apartmentIncRate  = 0;
let morgetgeProcent  = 0; 
let years = 0;
//---------------------------
let buySavings = 0;
let sumOfMoneyBuy = 0;
let sumRentSavings = 0;
let CAGR = 1.09;
let ISK = 0.99; // 9 procent increase in yearly savings at OMX30
let change = ISK*CAGR;

let savingsPerYearRent = []; // Array to hold savings for each year
let savingsPerYearBuy = [];


export const setRentAmount = (value) => {
    rentCostRENT = parseFloat(value);
    return rentCostRENT;
};

export const setRentIncrease = (value) => {
    rentIncreaseRENT = parseFloat(value);
    return rentIncreaseRENT;
};

//----------------------

export const calculateSavingsRent = () => {
    // Calculating the total rent with increase
    sumRentSavings = downPaymentBUY; // zero when button is pressed twice with same numbers
    let rentIncreaseRENTMethod = 1 - (rentIncreaseRENT/100);
    let loan = buyAmountBUY - downPaymentBUY;
    //sumRentSavings = downPaymentBUY;
    let yearlySavings = 0;
    // rent and morgetge payback
    let monthlyPayBack = (loan*(interestRate/100))/12 + (loan*morgetgeProcent/100)/12 ; 
    let monthlySavings = monthlyCostsBUY + monthlyPayBack - rentCostRENT;
    // the monthly savings for a renter is the overflow money from a buyers mortege and interest rate payment
    monthlySavings = (monthlyCostsBUY + monthlyPayBack - rentCostRENT);
    yearlySavings = monthlySavings*12;
    // if the montlhy savings are negative we only make money on the first invesment 
    if (monthlySavings <= 0)
    {
        for ( let i =0; i < years; i++)
            {
                sumRentSavings = sumRentSavings*change;
                
            }
    } else 
    {
        for ( let i =0; i < years; i++)
            {
            
                sumRentSavings = (sumRentSavings +yearlySavings)*change*rentIncreaseRENTMethod;
            }
    }

      let rentSavingsDisplay = new Intl.NumberFormat().format(Math.trunc(sumRentSavings-downPaymentBUY));

    return rentSavingsDisplay + " kr";
};

export const YearlySavingsRent = () =>
{
    savingsPerYearRent = [0];
    sumRentSavings = downPaymentBUY; // zero when button is pressed twice with same numbers
    let rentIncreaseRENTMethod = 1 - (rentIncreaseRENT/100);
    let loan = buyAmountBUY - downPaymentBUY;
    //sumRentSavings = downPaymentBUY;
    let yearlySavings = 0;
   


    // rent and morgetge payback
    let monthlyPayBack = (loan*(interestRate/100))/12 + (loan*morgetgeProcent/100)/12 ; 
    let monthlySavings = monthlyCostsBUY + monthlyPayBack - rentCostRENT;
    // the monthly savings for a renter is the overflow money from a buyers mortege and interest rate payment
    monthlySavings = (monthlyCostsBUY + monthlyPayBack - rentCostRENT);
    yearlySavings = monthlySavings*12;
    // the monthly savings for a renter is the overflow money from a buyers mortege and interest rate payment
    
    // if the montlhy savings are negative we only make money on the first invesment 
    if (monthlySavings <= 0)
    {
        for ( let i =0; i < years; i++)
            {
                sumRentSavings = sumRentSavings*change;
                savingsPerYearRent.push(sumRentSavings-downPaymentBUY); // Push the accumulated savings of each year
            }
    } else 
    {
        for ( let i =0; i < years; i++)
            {
                sumRentSavings = (sumRentSavings +yearlySavings)*change*rentIncreaseRENTMethod;
                savingsPerYearRent.push(sumRentSavings-downPaymentBUY); // Push the accumulated savings of each year
            }
    }

      //let rentSavingsDisplay = new Intl.NumberFormat().format(Math.trunc(sumRentSavings));

    return savingsPerYearRent;

};

//----------------------------------------------
export const setBuyAmount = (value) => {
    buyAmountBUY = parseFloat(value);
    return buyAmountBUY;
};

export const setInterestRate = (value) => {
    interestRate = parseFloat(value);
    return interestRate;
};

export const setDownPayment = (value) => {
    downPaymentBUY = parseFloat(value);
    return downPaymentBUY;
};

export const setMorgetgeProcent =(value) => {
    morgetgeProcent = parseFloat(value)
    return morgetgeProcent;
}

export const setYearlyValueIncreaseApt =(value) => {
    apartmentIncRate = parseFloat(value)
    return apartmentIncRate;
}

export const setMonthlyCosts = (value) => {
    monthlyCostsBUY = parseFloat(value);
    return monthlyCostsBUY;
};

export const setYears = (value) => {
    years = parseFloat(value);
    return years;
};


export const calculateSavingsBuy = () => {
    let apartmentValue = buyAmountBUY;
    let loan = buyAmountBUY - downPaymentBUY; // = 2 500 000
    let totalInterestPaid = 0;
    let salesTaxRate = 0.78;
    let totalMontlyCost = monthlyCostsBUY*12*years;
    let totalMorgetegeRepayment = 0;
    let apartmentIncRateMethod = (apartmentIncRate/100) + 1;
    let loanMorgetgeProcent = 1 - (morgetgeProcent/100);
    let totalExtraSavings =0;
    let monthlyPayBack = (loan*(interestRate/100))/12;
    let morgetgeRepayment = (loan*(morgetgeProcent/100))/12;

    let surplusRent = rentCostRENT - monthlyCostsBUY - monthlyPayBack - morgetgeRepayment ;


    if (surplusRent > 0)
    {
        for (let i =0; i < years ; i++)
        {
            totalExtraSavings = (totalExtraSavings + surplusRent*12)*change;
        }
    }


    for (let i = 0; i < years; i++) 
    {
         // Reducing the loan by the paid mortgage interest
        apartmentValue = apartmentValue*apartmentIncRateMethod; // Increasing the apartment value annually
        totalInterestPaid = totalInterestPaid + loan*(interestRate/100);
        totalMorgetegeRepayment = totalMorgetegeRepayment + loan*morgetgeProcent/100;
        loan = (loan * loanMorgetgeProcent);
    }

    let saleProceeds = ((apartmentValue-buyAmountBUY) * (salesTaxRate)); // +buyAmountBUY ; // Assuming saleTaxRate is the percentage deducted from the sale
    sumOfMoneyBuy = saleProceeds + totalExtraSavings - totalInterestPaid - totalMontlyCost - totalMorgetegeRepayment;

    buySavings = new Intl.NumberFormat().format(Math.trunc(sumOfMoneyBuy));

    return buySavings + " kr";
};


export const YearlySavingsBuy = () => {
    savingsPerYearBuy = [0];
    let apartmentValue = buyAmountBUY;
    let loan = buyAmountBUY - downPaymentBUY; // = 2 500 000
    let totalInterestPaid = 0;
    let salesTaxRate = 0.78;
    let saleProceeds =0;
    let yearlyMontlyCost = 0;
    let totalMorgetegeRepayment = 0;
    let apartmentIncRateMethod = (apartmentIncRate/100) + 1;
    let loanMorgetgeProcent = 1 - (morgetgeProcent/100);
    let totalExtraSavings = 0;
    let monthlyPayBack = (loan*(interestRate/100))/12;
    let morgetgeRepayment = (loan*(morgetgeProcent/100))/12;

    let surplusRent = rentCostRENT - monthlyCostsBUY - monthlyPayBack - morgetgeRepayment ;

    
    yearlyMontlyCost = yearlyMontlyCost + monthlyCostsBUY*12;


    for (let i = 0; i < years; i++) 
    {
         // Reducing the loan by the paid mortgage interest
        apartmentValue = apartmentValue*apartmentIncRateMethod; // Increasing the apartment value annually
        totalInterestPaid = totalInterestPaid + loan*(interestRate/100);
        totalMorgetegeRepayment = totalMorgetegeRepayment + loan*(morgetgeProcent/100);
        saleProceeds = ((apartmentValue-buyAmountBUY) * (salesTaxRate));// +buyAmountBUY ;
        if (surplusRent > 0)
            {
                totalExtraSavings = (totalExtraSavings + surplusRent*12)*change;
            }
            else {
                totalExtraSavings =0;
            }
        sumOfMoneyBuy = saleProceeds + totalExtraSavings - totalInterestPaid - yearlyMontlyCost - totalMorgetegeRepayment;
        savingsPerYearBuy.push(sumOfMoneyBuy); 
        loan = (loan * loanMorgetgeProcent); // kan vara så att den ska ligga ovanför 
    }

   return savingsPerYearBuy;
};

export const calculateSavingsTotal  = () => {
    let sum = Math.abs(sumOfMoneyBuy -sumRentSavings);
    let sumDisplay = new Intl.NumberFormat().format(Math.trunc(sum));

    return sumDisplay + " kr";
};

