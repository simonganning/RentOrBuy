import React, { useState } from 'react';
import './App.css';

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
  calculateSavingsBuy,
  calculateSavingsRent,
  calculateSavingsTotal,
  setYearlyValueIncreaseApt,
  YearlySavingsRent,
  YearlySavingsBuy
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

  const [savingsBuy, updateSavingsBuy] = useState('');
  const [savingsRent, updateSavingsRent] = useState('');
  const [savingsTotal, updateSavingsTotal] = useState('');

  const [chartDataRent, setChartDataRent] = useState([]); // Initialize chartData as an empty array
  const [chartDataBuy, setChartDataBuy] = useState([]); // Initialize chartData as an empty array


  const data = {
    labels: chartDataRent.map((_, index) => `År ${index}`),
    datasets: [
        {
            label: 'Hyresrätt',
            data: chartDataRent,
            borderColor: [
                '#257886'
            ],
            backgroundColor: [
               '#257886'
          ],
            borderWidth: 2,
        },
        {
          label: 'Bostadsrätt',
          data: chartDataBuy,
          backgroundColor: [
              '#477D17'
          ],
          borderColor: [
              '#477D17'
          ],
          borderWidth: 2,
      }
    ]
};


//------------------------------------------------
// handling of the rent inputs

const handleChartDataRent = () => {
  const newValue = YearlySavingsRent();
  setChartDataRent(newValue);
};

const handleChartDataBuy = () => {

  const newValue = YearlySavingsBuy();
  setChartDataBuy(newValue);

};

  const handleRentAmountRENT = (e) => {
    const newValue = e.target.value;
    updateRentAmount(newValue);
    setRentAmount(newValue); // This updates the rent amount in the handler
  };

  const handleRentIncreaseChange = (e) => {
    const newValue = e.target.value;
    updateRentIncrease(newValue);
    setRentIncrease(newValue);
  };

  const handlecalculateSavingsRent = () => {
    const total = calculateSavingsRent();
    updateSavingsRent(total);
  };

  //------------------------------------------
  // handling of the buy option inputs

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

  const handlecalculateSavingsBuy= () => {
    const total = calculateSavingsBuy();
    updateSavingsBuy(total);
  };

  const handlecalculateSavingsTotal = () => {
    const total = calculateSavingsTotal();
    updateSavingsTotal(total);
  };

  // den här är för att knappen ska ta in två på en gång
  const handleCalculateSavings = () => {
    handlecalculateSavingsRent();
    handlecalculateSavingsBuy();
    handlecalculateSavingsTotal();
    handleChartDataRent();
    handleChartDataBuy();
    
};



//---------------------------------------------
  
  return (
    <div className="container">

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
          </div>{/* Lower input box */}

          <div className='QA'>
            <p>Välj tidshorisont (år) och jämför!</p>
            <div className='year'>
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
      </div> {/* Input box*/}


      <div className="graphBox">

        <div className='titleBox'>
          <p>Ökning av investering / år</p>
        </div>

        <div className='upperGraphBox'>
          <LineChart chartData={data} />
        </div>
       
        <div className='lowerGraphBox'>
          <div className='outputBox'>
            <p>Ökning av hyresrätt : {savingsRent}</p>
            </div>
            
            <div className='outputBox'>
            <p>Ökning av bostadsrätt : {savingsBuy}</p>
            
            </div>
            <div className='outputBox'>
            <p>Skillnaden: {savingsTotal}</p>
            
            </div>
        </div>{/* lowerGraphBox*/}

      </div> {/* graph box*/}
      
    </div> // container
  );
}

export default App;
