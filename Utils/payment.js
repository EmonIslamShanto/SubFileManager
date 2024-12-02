import pkg from 'authorize-net';
const { APIContracts, APIControllers } = pkg;

// Set up your credentials (you can store these in the `.env` file for security)
const apiLoginId = process.env.AUTHORIZENET_API_LOGIN_ID;
const transactionKey = process.env.AUTHORIZENET_TRANSACTION_KEY;

// Function to charge a card
export const chargeCard = async (paymentDetails) => {
  try {
    // Create a new credit card object with the payment details from the user
    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(paymentDetails.cardNumber);
    creditCard.setExpirationDate(paymentDetails.expiryDate);
    creditCard.setCardCode(paymentDetails.cvc);

    // Create a payment object to pass to the transaction request
    const payment = new APIContracts.PaymentType();
    payment.setCreditCard(creditCard);

    // Create a transaction request (Sale - Charge a card)
    const transactionRequest = new APIContracts.TransactionRequestType();
    transactionRequest.setTransactionType(APIContracts.TransactionTypeEnum.AUTH_CAPTURE_TRANSACTION);
    transactionRequest.setPayment(payment);
    transactionRequest.setAmount(97.00); // Charge $97

    // Create a transaction request object and set the transaction details
    const request = new APIContracts.CreateTransactionRequest();
    request.setMerchantAuthentication(new APIContracts.MerchantAuthenticationType());
    request.getMerchantAuthentication().setName(apiLoginId);
    request.getMerchantAuthentication().setTransactionKey(transactionKey);
    request.setTransactionRequest(transactionRequest);

    // Create a controller object to send the request to Authorize.Net
    const ctrl = new APIControllers.CreateTransactionController(request.getJSON());

    // Execute the transaction
    const response = await ctrl.execute();
    const responseData = ctrl.getResponse();

    if (responseData.messages.resultCode === APIContracts.MessageTypeEnum.OK) {
      console.log('Transaction Successful');
      return true; // Payment successful
    } else {
      console.log('Transaction Failed:', responseData.messages.message[0].text);
      return false; // Payment failed
    }
  } catch (err) {
    console.error('Payment Error:', err);
    return false; // Payment failed due to error
  }
};
