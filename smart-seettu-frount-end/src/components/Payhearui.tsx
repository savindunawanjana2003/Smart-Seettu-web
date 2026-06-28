import axios from "axios";

const PaymentButton = () => {
  const handlePayment = async () => {
    const paymentDetails = {
      first_name: "savindu",
      last_name: "jahhhj",
      email: "savindu@gmail.com",
      phone: "0721234567",
      address: "karaththaduwa,meetiyagoda",
      city: "galle",
      country: "Sri lanka",
      order_id: "ItemNo12345",
      items: "Premium Membership",
      currency: "LKR",
      amount: "1005.00",
    };
    // order_id + formattedAmount + currency
    try {
      // Request backend to generate the hash value
      const response = await axios.post(
        "http://localhost:3001/api/v1/payment/getHash",
        paymentDetails, 
      );

      console.log("Response data:", response.data);

      if (response.status === 200) {
        const { hash, merchant_id } = response.data;

        // Payment configuration
        const payment = {
          sandbox: true, // Use sandbox for testing
          merchant_id: merchant_id,
          return_url:
            "http://localhost:5173/pages/Dashbord/PaymentSuccsessfully", // Replace with your return URL
          cancel_url:
            "http://localhost:5173/pages/Dashbord/PaymentUnSuccsessfully", // Replace with your cancel URL
          notify_url:
            "https://jaxson-callow-amya.ngrok-free.dev/payment/notify", // Replace with your notify URL - This should be public IP (No Localhost)
          first_name: paymentDetails.first_name,
          last_name: paymentDetails.last_name,
          email: paymentDetails.email,
          phone: paymentDetails.phone,
          address: paymentDetails.address,
          city: paymentDetails.city,
          country: paymentDetails.country,
          order_id: paymentDetails.order_id,
          items: paymentDetails.items,
          currency: paymentDetails.currency,
          amount: paymentDetails.amount,
          hash: hash,
        };

        console.log("Sending to PayHere:", {
          merchant_id: payment.merchant_id,
          order_id: payment.order_id,
          amount: payment.amount,
          currency: payment.currency,
          hash: payment.hash,
        });

        (window as any).payhere.startPayment(payment);
      } else {
        console.error("Failed to generate hash for payment.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <button id="payhere-payment" onClick={handlePayment}>
        PayHere Pay
      </button>
    </div>
  );
};

export default PaymentButton;

// order_id: paymentDetails.order_id.trim(),
//           items: "Item Title",
//           amount: paymentDetails.amount.trim(),
//           currency: paymentDetails.currency.trim(),
//           first_name: paymentDetails.first_name.trim(),
//           last_name: paymentDetails.last_name.trim(),
//           email: paymentDetails.email.trim(),
//           phone: paymentDetails.phone.trim(),
//           address: paymentDetails.address.trim(),
//           city: paymentDetails.city.trim(),
//           country: paymentDetails.country.trim(),
//           hash: hash.trim(),
