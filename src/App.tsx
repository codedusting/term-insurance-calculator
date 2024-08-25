import { useState } from "react";

export default function App() {
  const [ageOfInsuredPerson, setAgeOfInsuredPerson] = useState(1);
  const [ageOfPayer, setAgeOfPayer] = useState(1);
  const [currentCostOfLiving, setCurrentCostOfLiving] = useState(1);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);
  const [numberOfYearsLeft, setNumberOfYearsLeft] = useState(0);
  const [ageToOptForPayment, setAgeToOptForPayment] = useState(0);
  const [totalCoveredRequired, setTotalCoveredRequired] = useState(0);

  return (
    <section className="flex flex-col items-center justify-start p-4 gap-y-8">
      <h1 className="text-2xl md:text-4xl font-bold">Term Insurance Amount Calculator</h1>
      <div className="flex justify-between items-start w-full gap-8">
        <form className="flex flex-1 flex-col gap-y-6 items-start justify-start" onSubmit={(e) => {
          e.preventDefault();
          let yearsIShouldPayTermInsurance = lifeExpectancy - ageOfInsuredPerson;
          if ((yearsIShouldPayTermInsurance + ageOfInsuredPerson) > lifeExpectancy) {
            yearsIShouldPayTermInsurance = lifeExpectancy - ageOfPayer;
          }
          let principle = currentCostOfLiving;
          let totalCoverageRequired = principle;
          const rateOfInflation = 0.07;

          for (let i = 1; i <= yearsIShouldPayTermInsurance; i++) {
            principle += principle * rateOfInflation;
            totalCoverageRequired += principle;
          }

          setNumberOfYearsLeft(yearsIShouldPayTermInsurance);
          setAgeToOptForPayment(yearsIShouldPayTermInsurance + ageOfPayer);
          setTotalCoveredRequired(Number(totalCoverageRequired.toFixed(2)));

        }}>
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="ageOfInsuredPerson">Age of insured person</label>
            <input type="text" id="ageOfInsuredPerson" inputMode="numeric" pattern="[0-9]+" required
                   defaultValue={ageOfInsuredPerson}
                   onChange={e => setAgeOfInsuredPerson(Number(e.target.value))} />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="ageOfPayer">Age of person paying insurance</label>
            <input type="text" id="ageOfPayer" inputMode="numeric" pattern="[0-9]+" required
                   defaultValue={ageOfPayer}
                   onChange={e => setAgeOfPayer(Number(e.target.value))} />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="currentCostOfLiving">Current cost of Living</label>
            <input type="text" id="currentCostOfLiving" inputMode="numeric" pattern="[0-9]+" required
                   defaultValue={currentCostOfLiving}
                   onChange={e => setCurrentCostOfLiving(Number(e.target.value))} />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="lifeExpectancy">Average Life Expectancy</label>
            <input type="text" id="lifeExpectancy" inputMode="numeric" pattern="[0-9]+" required
                   defaultValue={lifeExpectancy}
                   onChange={e => setLifeExpectancy(Number(e.target.value))} />
          </div>
          <button type="submit"
                  className="bg-black/75 px-4 py-2 text-white rounded hover:bg-black focus:bg-black">Calculate
          </button>
        </form>
        <div className="flex-1 flex flex-col gap-y-6">
          <div>
            <h2 className="text-lg font-bold md:text-xl mb-4">Inputs</h2>
            <p>Age of insured person: <span className="font-bold">{ageOfInsuredPerson}</span></p>
            <p>Age of person paying insurance: <span className="font-bold">{ageOfPayer}</span></p>
            <p>Current cost of Living: <span className="font-bold">{currentCostOfLiving}</span></p>
            <p>Average Life Expectancy: <span className="font-bold">{lifeExpectancy}</span></p>
          </div>
          <hr />
          <div>
            <h2 className="text-lg font-bold md:text-xl mb-4">Results</h2>
            <p>Number of years left to pay term insurance: <span className="font-bold">{numberOfYearsLeft}</span></p>
            <p>Age till which I should opt for: <span className="font-bold">{ageToOptForPayment}</span></p>
            <p>Total Coverage Required: <span className="font-bold">{totalCoveredRequired}</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
