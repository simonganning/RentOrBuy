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

let CAGR = 1.09;  // yearly return on the stock market
let ISK = 0.99; // 9 procent increase in yearly savings at OMX30
let change = ISK*CAGR; 


export const setRentAmount = (value) => {
    rentCostRENT = parseFloat(value);
    return rentCostRENT;
};

export const setRentIncrease = (value) => {
    rentIncreaseRENT = parseFloat(value);
    return rentIncreaseRENT;
};
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

export const YearlySavingsRent = () => {
    let savingsList = [0]; 
    let totalInvestment = downPaymentBUY; 
    let loan = buyAmountBUY - downPaymentBUY;

    for (let i = 0; i < years; i++) {
        totalInvestment = totalInvestment * change;

        let yearlyInterest = loan * (interestRate / 100);
        let yearlyMortgageRepayment = loan * (morgetgeProcent / 100);
        let yearlyHousingCosts = yearlyInterest + yearlyMortgageRepayment + (monthlyCostsBUY * 12);
        let yearlyRentCost = rentCostRENT * 12;

        if (yearlyHousingCosts > yearlyRentCost) {
            let surplus = yearlyHousingCosts - yearlyRentCost;
            totalInvestment = totalInvestment + surplus;
        }

        loan = loan - yearlyMortgageRepayment;
        rentCostRENT = rentCostRENT * (1 + rentIncreaseRENT / 100);
        savingsList.push(totalInvestment - downPaymentBUY);
    }

    return savingsList;
};


export const YearlySavingsBuy = () => {
    let savingsList = [0];
    let apartmentValue = buyAmountBUY; 
    let loan = buyAmountBUY - downPaymentBUY; 
    let totalInterestPaid = 0;
    let totalMortgagePaid = 0;
    let totalExtraSavings = 0;
    let totalBalance = 0; 
    let salesTaxRate = 0.78; 

    for (let i = 0; i < years; i++) {
        apartmentValue = apartmentValue * (1 + (apartmentIncRate / 100));

        let yearlyInterest = loan * (interestRate / 100);
        let yearlyMortgageRepayment = loan * (morgetgeProcent / 100);
        totalInterestPaid += yearlyInterest;
        totalMortgagePaid += yearlyMortgageRepayment;

        let yearlyHousingCosts = yearlyInterest + yearlyMortgageRepayment + (monthlyCostsBUY * 12);

        let saleProceeds = ((apartmentValue - buyAmountBUY) * salesTaxRate) + buyAmountBUY;

        let yearlyRentCost = rentCostRENT * 12;
        if (yearlyRentCost > yearlyHousingCosts) {
            totalExtraSavings += (yearlyRentCost - yearlyHousingCosts); 
        }

        totalBalance = saleProceeds + totalExtraSavings - totalInterestPaid - totalMortgagePaid;
        savingsList.push(totalBalance - buyAmountBUY);
        loan = loan - yearlyMortgageRepayment;
    }

    return savingsList;
};



export const getSumOfBuy = () => {
    const savings = YearlySavingsBuy(); 
    return savings.length > 0 ? savings[savings.length - 1] : 0;
};


//------
// get the total amount of savings for renting 
export const getSumOfRent = () => {
    const savings = YearlySavingsRent();
    return savings.length > 0 ? savings[savings.length - 1] : 0;
};

// ---------------- savings

export const calculateSavingsTotal = () => {
    let buySavings = getSumOfBuy();
    let rentSavings = getSumOfRent();

    let sum = Math.abs(buySavings - rentSavings);
    return sum ;
};

