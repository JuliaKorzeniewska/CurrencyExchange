function convertCurrency() {
  const currencySelect = document.getElementById("currency");
  const amountInput = document.getElementById("amount");
  const resultDiv = document.getElementById("result");

  const currencyCode = currencySelect.value;
  let amount = parseFloat(amountInput.value);

  if (amount <= 0 || isNaN(amount)) {
    resultDiv.innerHTML = "Wprowadź poprawną kwotę.";
    return;
  }
  amount = amount.toFixed(2);

  const apiUrl = `https://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/?format=json`;

  resultDiv.innerHTML = '<div class="loader"></div>';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (isDataValid(data)) {
        const rate = data.rates[0].mid;
        const result = amount * rate;
        resultDiv.innerHTML = `${amount} ${currencyCode} = ${result.toFixed(
          2
        )} PLN`;
      } else {
        resultDiv.innerHTML =
          "Wystąpił błąd podczas pobierania aktualnego kursu.";
      }
    })
    .catch((error) => {
      resultDiv.innerHTML = "Wystąpił błąd podczas przeliczania waluty.";
    });
}

function isDataValid(data) {
  return !!(data?.rates?.length > 0 && data.rates[0].mid);
}

const amountInput = document.getElementById("amount");
amountInput.addEventListener("input", function () {
  const inputValue = amountInput.value;
  const regex = /^\d*\.?\d{0,2}$/;
  if (!regex.test(inputValue)) {
    amountInput.value = inputValue.slice(0, -1);
  }
});
