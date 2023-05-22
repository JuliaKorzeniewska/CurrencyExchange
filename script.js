function convertCurrency() {
  const currencySelect = document.getElementById("currency");
  const amountInput = document.getElementById("amount");
  const resultDiv = document.getElementById("result");

  const currencyCode = currencySelect.value;
  const amount = amountInput.value;

  const apiUrl = `https://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/?format=json`;

  resultDiv.innerHTML = '<div class="loader"></div>';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[0].mid;
      const result = amount * rate;
      resultDiv.innerHTML = `${amount} ${currencyCode} = ${result.toFixed(
        2
      )} PLN`;
    })
    .catch((error) => {
      console.log(error);
      resultDiv.innerHTML = "Wystąpił błąd podczas przeliczania waluty.";
    })
    .finally(() => {
      resultDiv.querySelector(".loader").remove();
      setTimeout(() => {
        resultDiv.querySelector(".loader").remove();
      }, 3000);
    });
}
