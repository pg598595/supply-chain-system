import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts, web3 } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const triggerPayment =  async (index) => {
    console.log(index)
    const amountWei = web3.utils.toWei("1", "ether");
    await contract.methods.triggerPayment(1).send({ from: accounts[0],value:amountWei  });
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.createItem("test",newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={()=>triggerPayment(20)}>
      triggerPayment()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
