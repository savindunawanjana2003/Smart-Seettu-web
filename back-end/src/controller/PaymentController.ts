import { Request, Response } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const merchant_id = (process.env.PAYHERE_MERCHANT_ID as string).trim();
const merchant_secret = (process.env.PAYHERE_MERCHANT_SECRET as string).trim();
console.log("merchant_secret :=>" + merchant_secret);
console.log(" merchant_id:=>" + merchant_id);
console.log(" +++++++++++++++++++++++++++++++++++++++");

export const getHash = (req: Request, res: Response) => {
  console.log("merchant_secret :=>" + merchant_secret);
  console.log(" merchant_id:=>" + merchant_id);
  console.log(" +++++++++++++++++++++++++++++++++++++++");
  const {
    order_id,
    amount,
    currency,
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    country,
    items,
  } = req.body;

  const formattedAmount = Number(amount).toFixed(2); 

  const hashedSecret = crypto
    .createHash("md5")
    .update(merchant_secret)
    .digest("hex")
    .toUpperCase();

  const stringToHash =
    merchant_id +
    order_id +
    formattedAmount +
    currency +
    first_name +
    last_name +
    email +
    phone +
    address +
    city +
    country +
    items +
    hashedSecret;

  const hash = crypto
    .createHash("md5")
    .update(stringToHash)
    .digest("hex")
    .toString()
    .toUpperCase();

  console.log("hash :" + hash);
  res.json({ hash, merchant_id });
};

export const notify = (req: Request, res: Response) => {
  console.log("Payment notification received");

  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = req.body;

  const local_md5sig = crypto
    .createHash("md5")
    .update(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        crypto
          .createHash("md5")
          .update(merchant_secret)
          .digest("hex")
          .toUpperCase(),
    )
    .digest("hex")
    .toUpperCase();

  console.log("Payment notification for order:", order_id);

  if (local_md5sig === md5sig && status_code == "2") {
    // Payment success - update the database
    console.log("Payment successful for order:", order_id);
    res.sendStatus(200);
  } else {
    // Payment verification failed
    console.log("Payment verification failed for order:", order_id);
    res.sendStatus(400);
  }
};

// import { Request, Response } from "express";
// import dotenv from "dotenv";
// import crypto from "crypto";

// dotenv.config();

// const merchant_id = process.env.PAYHERE_MERCHANT_ID || "";
// const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET || "";

// export const getHash = (req: Request, res: Response) => {
//   const { order_id, amount, currency } = req.body;
//   const formattedAmount = parseFloat(amount).toFixed(2);

//   const hashedSecret = crypto
//     .createHash("md5")
//     .update(merchant_secret)
//     .digest("hex")
//     .toUpperCase();

//   const stringToHash = merchant_id + order_id + formattedAmount + currency + hashedSecret;

//   const hash = crypto
//     .createHash("md5")
//     .update(stringToHash)
//     .digest("hex")
//     .toUpperCase();

//   res.json({ hash, merchant_id });
// };

// export const notify = (req: Request, res: Response) => {
//   const { merchant_id: p_merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig } = req.body;

//   const hashedSecret = crypto
//     .createHash("md5")
//     .update(merchant_secret)
//     .digest("hex")
//     .toUpperCase();

//   const local_md5sig = crypto
//     .createHash("md5")
//     .update(p_merchant_id + order_id + payhere_amount + payhere_currency + status_code + hashedSecret)
//     .digest("hex")
//     .toUpperCase();

//   if (local_md5sig === md5sig && status_code === "2") {
//     console.log("Payment Success:", order_id);
//     res.sendStatus(200);
//   } else {
//     console.error("Payment Failed or Invalid Signature");
//     res.sendStatus(400);
//   }
// };
