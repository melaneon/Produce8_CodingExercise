import {inputs} from "../../data/userInputs"

export default function handler(req, res) {

    if(req.method === 'POST'){
      const purchaseprice = req.body.range;
      const interestrate = req.body.range2;
      const period = req.body.radiochoice;
      const monthlypayment = req.body.payment;
      const name = req.body.userName;
      const familyName = req.body.userFamilyName;
      const phoneNumber = req.body.userPhoneNumber;
      const emailAddress = req.body.userEmail;

      const newInput = {
            id: Date.now(),
            purchaseprice: purchaseprice, 
            interestrate: interestrate,
            period: period, 
            monthlypayment: monthlypayment,
            name: name,
            familyName: familyName,
            phoneNumber: phoneNumber,
            emailAddress: emailAddress
          }
      
      inputs.push(newInput)
  
      setTimeout(() => {
          if (
            (purchaseprice !== "NaN") &&
            (interestrate !== "NaN") &&
            (period !== "NaN") &&
            (monthlypayment !== "NaN") &&
            (name !== "NaN") &&
            (familyName !== "NaN") &&
            (phoneNumber !== "NaN") &&
            (emailAddress !== "NaN")
          
          ) res.status(201).json(newInput);
          else
            res
              .status(400)
              .json({
                error:
                  "There was a problem calculating your mortgage. Please try again",
              });
        }, 1000);
    
      }else{
        res.status(400).json({ error: 'Only accepts POST' })
    }
  


    return payment;
} 


