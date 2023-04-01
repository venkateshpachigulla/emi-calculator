import "./styles.css";
import { useEffect, useState } from "react";
import { tenureData } from "./utils/constants";
import TextInput from "./components/TextInput";
import SliderInput from "./components/SliderInput";
import { numberWithCommas } from "./utils/helpers";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [processingFee, setProcessingFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(12);

  const calculateEMI = (downpayment) => {
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    if (!cost) return;

    const loanAmount = cost - downpayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);
    return Number(EMI / 12).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  const updateEMI = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    const dp = calculateDP(emi);
    setDownPayment(dp);
  };

  const totalDownPayment = () => {
    return numberWithCommas(
      (
        Number(downPayment) +
        (cost - downPayment) * (processingFee / 100)
      ).toFixed(0)
    );
  };

  const totalEMI = () => {
    return numberWithCommas(Number(emi * tenure).toFixed(0));
  };

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>

      <TextInput
        title={"Total Cost of Asset"}
        state={cost}
        setState={setCost}
      />

      <TextInput
        title={"Interest Rate (in %)"}
        state={interest}
        setState={setInterest}
      />

      <TextInput
        title={"Processing Fee (in %)"}
        state={processingFee}
        setState={setProcessingFee}
      />

      <SliderInput
        title={"Down Payment"}
        underlineTitle={`Total Down Payment : ${totalDownPayment()}`}
        min={0}
        max={cost}
        state={downPayment}
        onChange={updateEMI}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <SliderInput
        title={"Loan per Month"}
        underlineTitle={`Total Loan Amount : ${totalEMI()}`}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
        state={emi}
        onChange={updateDownPayment}
      />

      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => (
          <button
            className={`tenure ${t === tenure ? "selected" : ""}`}
            key={t}
            onClick={() => setTenure(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
