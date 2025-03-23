import React, { useState, useEffect } from 'react';
import './App.css';
import './api.js';

import {
  fetchRateAPI,
  fetchPropertyIndexAPI,
  calculateYearlyGrowth
} from './api.js';

// Chart.js setup
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
// Components
import { LineChart } from "./LineChart.js"; // Adjusted for named export

import {
  setRentAmount,
  setRentIncrease,
  setBuyAmount,
  setInterestRate,
  setDownPayment,
  setMonthlyCosts,
  setMorgetgeProcent,
  setYears,
  calculateSavingsTotal,
  setYearlyValueIncreaseApt,
  YearlySavingsRent,
  YearlySavingsBuy,
  getSumOfBuy,
  getSumOfRent
} from './inputHandler';

Chart.register(CategoryScale);


function App() {

  const [rentAmount, updateRentAmount] = useState('');
  const [rentIncrease, updateRentIncrease] = useState('');
  const [buyAmount, updateBuyAmount] = useState('');
  const [interestRate, updateInterestRate] = useState('');
  const [downPayment, updateDownPayment] = useState('');
  const [monthlyCosts, updateMonthlyCosts] = useState('');
  const [morgetgeProcent, updateMorgetgeProcent] = useState('');
  const [years, updateYears] = useState('');


  const [yearlyValueIncreaseApt, updateYearlyValueIncreaseApt] = useState('');

// the lists of yearly increase
  const [savingsTotal, updateSavingsTotal] = useState('');

// the total of savings and renting
  const [savingsRentSum, updateSumRent] = useState('');
  const [savingsBuySum, updateSumBuy] = useState('');


  const [chartDataRent, setChartDataRent] = useState([]); // Initialize chartData as an empty array
  const [chartDataBuy, setChartDataBuy] = useState([]); // Initialize chartData as an empty array

  const [rateAPI, setRateAPI] = useState([]);
  const [propertyIndexAPI, setPropertyIndex] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const rate = await fetchRateAPI();
      setRateAPI(rate);
    };
    fetchData();
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      const rate = await fetchPropertyIndexAPI();
      setPropertyIndex(rate);
    };
    fetchData();
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
        const rate = await fetchPropertyIndexAPI();
        setPropertyIndex(rate);

        const growthData = calculateYearlyGrowth(rate);
        console.log("Yearly Growth Data:", growthData);
    };
    fetchData();
}, []);


const data = {
  labels: chartDataRent.map((_, index) => `År ${index}`),
  datasets: [
      {
          label: 'Hyresrätt',
          data: chartDataRent, 
          borderColor: 'pink',  // Change line color to black
          backgroundColor: 'pink', // Change fill to white
          borderWidth: 2,
      },
      {
        label: 'Bostadsrätt',
        data: chartDataBuy,
        borderColor: 'white',  // Change line color to black
        backgroundColor: 'white', // Change fill to white
        borderWidth: 2,
    }
  ]
};

//------------------------------------------------
// handling of the rent chart inputs

const handleChartDataRent = () => {
  const newValue = YearlySavingsRent();
  setChartDataRent(newValue);
};

const handleChartDataBuy = () => {
  const newValue = YearlySavingsBuy();
  setChartDataBuy(newValue);
};

 
  //-----------------------------------------------------------
  // input from user start

  const handleRentAmountRENT = (e) => {
    const newValue = e.target.value;
    updateRentAmount(newValue);
    setRentAmount(newValue); 
  };

  const handleRentIncreaseChange = (e) => {
    const newValue = e.target.value;
    updateRentIncrease(newValue);
    setRentIncrease(newValue);
  };


  const handleBuyCost = (e) =>
  {
    const newValue = e.target.value;
    updateBuyAmount(newValue);
    setBuyAmount(newValue);
  }

 
  const handleYearlyValueIncreaseApt = (e) => {
    const newValue = e.target.value;
    updateYearlyValueIncreaseApt(newValue);
    setYearlyValueIncreaseApt(newValue);
  };

  const handleInterestRate = (e) => {
    const newValue = e.target.value;
    updateInterestRate(newValue);
    setInterestRate(newValue);
  };

  const handleDownPayment = (e) => {
    const newValue = e.target.value;
    updateDownPayment(newValue);
    setDownPayment(newValue);
  };

  const handleMorgetgeProcent = (e) =>
  {
    const newValue = e.target.value;
    updateMorgetgeProcent(newValue);
    setMorgetgeProcent(newValue);

  };

  const handleMonthlyCosts = (e) => {
    const newValue = e.target.value;
    updateMonthlyCosts(newValue);
    setMonthlyCosts(newValue);
  };

  const handleYears = (e) => {
    const newValue = e.target.value;
    updateYears(newValue);
    setYears(newValue);
  };

// input from user end
  //-----------------------------------------------------------

  const handlecalculateSavingsBuy= () => {
    const total = getSumOfBuy();
    const roundedTotal = Math.round(total); // Store the rounded value
    updateSumBuy(roundedTotal); // Update state with the rounded value
  };

  const handleFinalSavingsRent = () => {
    const total = getSumOfRent();
    const roundedTotal = Math.round(total); // Store the rounded value
    updateSumRent(roundedTotal); // Update s
};


const handlecalculateSavingsTotal = () => {
  const total = calculateSavingsTotal();
  updateSavingsTotal(total);
};

  // den här är för att knappen ska ta in två på en gång
  const handleCalculateSavings = () => {
    handlecalculateSavingsBuy();
    handlecalculateSavingsTotal();
    handleChartDataRent();
    handleChartDataBuy();
    handleFinalSavingsRent();
    
};
//---------------------------------------------
  return (
    <div className="container">
       <img src="https://www.exsitec.se/hubfs/Web%20gradients/background.webp" 
             className="backgroundImage"
             />
      <div className="inputBox">
        <div className='titleBox'>
        <p>Att hyra en bostad (SEK)</p>
        </div>
          <div className='innerInputBox'>
            <div className='QA'>
              <p>Månadshyran</p>
                <input
                  type="text"
                  placeholder="Ex, 4000"
                  className="input"
                  value={rentAmount}
                  onChange={handleRentAmountRENT}
                />
            </div>
            <div className='QA'>
                <p>Ökning av månadshyra varje år?</p>
                    <input
                    type="text"
                    placeholder="Standard är mellan 0.8-2.2"
                    className="input"
                    value={rentIncrease}
                    onChange={handleRentIncreaseChange}
                  />
            </div>
          </div> {/* Upper input box */}
          <div className='titleBox'>
              <p>Att köpa en bostad (SEK)</p>
            </div>
          <div className='innerInputBox'>
                  <div className='QA'>
                  <p>Hur mycket kostar bostaden?</p>
                  <input
                    type="text"
                    placeholder="Ex, 3000000"
                    className="input"
                    value={buyAmount}
                    onChange={handleBuyCost}
              />
               <a target="_blank" href='https://www.hemnet.se/'>Hemnet</a>
                  </div>

                <div className='QA'>
                  <p>Hur mycket kommer bostaden öka i pris %/år?</p>
                  <input
                    type="text"
                    placeholder="Snitt bostadsrätt i Sverige är 10% "
                    className="input"
                    value={yearlyValueIncreaseApt}
                    onChange={handleYearlyValueIncreaseApt}
                  />
                  <a target="_blank" href='https://www.mynewsdesk.com/se/svensk_fastighetsformedling/pressreleases/historisk-aaterblick-paa-bomarknaden-saa-har-sveriges-bostadspriser-utvecklats-de-senaste-20-aaren-2432578'>Bostadsökning</a>
                  </div>
                  <div className='QA'>
                    <p>Hur många procent ligger boräntan på (fast)?</p>
                  <input
                    type="text"
                    placeholder="Ex, 4 "
                    className="input"
                    value={interestRate}
                    onChange={handleInterestRate}
              />
             <a target="_blank" href='https://www.finansportalen.se/borantor/'>Ränta</a>  
            </div>
                <div className='QA'>
                <p>Vad är din kontantinsats?</p>
                  <input
                    type="text"
                    placeholder="Ex, 500000 "
                    className="input"
                    value={downPayment}
                    onChange={handleDownPayment}
                  />
                 <a target="_blank" href='https://www.handelsbanken.se/sv/ekonomi-i-livet/privatekonomi/boendeekonomi/kopa-bostad/kontantinsats'>Kontantinsats</a>
            </div>
                  <div className='QA'>
                  <p>Hur många % betalar du av lånet / år ?</p>
                  <input
                    type="text"
                    placeholder="Vanligt med 1-3"
                    className="input"
                    value={morgetgeProcent}
                    onChange={handleMorgetgeProcent}
              />
              <a target="_blank" href='https://www.konsumenternas.se/lan--betalningar/lan/bolan/amorteringskrav/'>Amortering</a>
                  </div>
                  <div className='QA'>
                  <p>Hyra och underhållning</p>
                  <input
                    type="text"
                    placeholder="Ex, 3000 "
                    className="input"
                    value={monthlyCosts}
                    onChange={handleMonthlyCosts}
              />
                  </div>
                  <div className='QA'>
            <p>Välj tidshorisont (år) och jämför!</p>
            <div>
            <input
                    type="text"
                    placeholder="Ex, 3 eller 15 "
                    className="input"
                    value={years}
                    onChange={handleYears}
              />
                    <button className='button' onClick={handleCalculateSavings}>Kör!</button>
                  </div>
                    
            </div>


          </div>{/* Lower input box */}

          
      </div> {/* Input box*/}


      <div className="graphBox">

        <div className='titleBoxTest'>
          <p>Ökning av investering / år</p>
        </div>

        <div className='upperGraphBox'>
          <LineChart chartData={data} />
        </div>
       
        <div className='lowerGraphBox'>
          <div className='outputBox'>
          <p>Ökning av hyresrätt : {new Intl.NumberFormat().format(Math.trunc(savingsRentSum))} kr</p>
          </div>
            
            <div className='outputBox'>
            <p>Ökning av bostadsrätt : {new Intl.NumberFormat().format(Math.trunc(savingsBuySum))} kr</p>
            
            </div>
            <div className='outputBox'>
            <p>Skillnaden: {new Intl.NumberFormat().format(Math.trunc(savingsTotal))} kr</p>
            
            </div>
        </div>{/* lowerGraphBox*/}
        <div className='lowerGraphBox'>
          <div className='outputBox'>
            <p> Ränta :  {rateAPI ? rateAPI : "Loading..."}</p>
            </div>
            <div className='outputBox'>
              <div className="yearlyGrowthContainer">
                {calculateYearlyGrowth(propertyIndexAPI).map(entry => (
                  <span key={entry.year} className="growthItem">
                    {entry.year}: {entry.growthPercentage}%
                  </span>
                ))}
              </div>
            </div>
        </div>{/* lowerGraphBox*/}
      </div> {/* graph box*/}
    </div> // container
  );
}

export default App;
