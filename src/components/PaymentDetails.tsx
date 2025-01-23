import React from "react";

interface PaymentDetailProps {
  amount: string;
  firstName: string;
  fathersName: string;
  grandFathersName: string;
  passportNumber: string;
  dateOfBirth: string;
}

interface PaymentDetailsCardProps {
  details: PaymentDetailProps;
}
const PaymentDetails = ({ details }: PaymentDetailsCardProps) => {
  const {
    amount,
    firstName,
    fathersName,
    grandFathersName,
    passportNumber,
    dateOfBirth,
  } = details;
  return (
    <div>
      <p className="font-bold text-[16px] text-[#00000066]  ">
        Payment Details
      </p>

      <div
        id="paymentCardInfoCard"
        className="mt-3  max-w-md mx-auto  rounded-[20px] p-6 shadow-[0_2px_16px_rgba(9,9,9,0.08)]  border-gray-100"
      >
        {/* Payment Amount */}
        <h2 className="text-4xl font-bold text-center text-black ">
          {amount} Birr
        </h2>

        {/* Payment Details */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
            <span className="text-[15px] text-[#7B7B7B]">First Name:</span>
            <span className="text-black text-[15px] font-medium">
              {firstName}
            </span>
          </div>
          <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
            <span className="text-[15px] text-[#7B7B7B]">Father’s Name:</span>
            <span className="text-black text-[15px] font-medium">
              {fathersName}
            </span>
          </div>
          <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
            <span className="text-[15px] text-[#7B7B7B]">
              Grand Father’s Name:
            </span>
            <span className="text-black text-[15px] font-medium">
              {grandFathersName}
            </span>
          </div>
          <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
            <span className="text-[15px] text-[#7B7B7B]">Passport Number:</span>
            <span className="text-black text-[15px] font-medium">
              {passportNumber}
            </span>
          </div>
          <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
            <span className="text-[15px] text-[#7B7B7B]">Date Of Birth:</span>
            <span className="text-black text-[15px] font-medium">
              {dateOfBirth}
            </span>
          </div>
        </div>

        {/* Total Amount */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-[16px] font-[700] text-[#14670F]">
            Total Amount:
          </span>
          <span className="text-[16px] font-[700] text-[#14670F]">
            {amount} Birr
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
