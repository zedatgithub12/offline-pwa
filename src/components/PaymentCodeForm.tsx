"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PaymentDetails from "./PaymentDetails";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Hajj payment code is required"),
});

const PaymentCodeForm: React.FC = () => {
  const paymentDetails = {
    amount: "329,000.00",
    firstName: "Muhammad",
    fathersName: "Aamir",
    grandFathersName: "Abdullah",
    passportNumber: "EP-3473533",
    dateOfBirth: "May 12, 1980",
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleGettingReservation = (code: { code: string }) => {
    setLoading(true);
    const url = "";
    const header = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "POST",
      headers: header,
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setData(response.data);
        }
      })
      .catch((error) => {
        alert(error.message); // mike you can replace this toast with super app toast
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //  ------------- SUPER APP WILL PROCESS THE FOLLOWING FUNCTION --------------

  const handlePaymentProcessing = () => {
    //mike you can take it from here
  };

  return (
    <div className="flex items-center justify-center ">
      <div className=" xs:w-full  md:w-1/2 lg:w-1/3 min-h-screen bg-white p-4 relative">
        <p className="text-2xl font-bold  text-black">Enter Payment Code</p>
        <p className="text-md font-medium mt-1 mb-4 text-gray-500">
          Please enter your Hajj payment code and proceed the Payment.
        </p>

        <Formik
          initialValues={{
            code: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleGettingReservation(values);
          }}
        >
          {() => (
            <Form className=" flex flex-col py-3 justify-between ">
              <div className="mb-5">
                <label
                  htmlFor="code"
                  className="block text-md font-medium text-black"
                >
                  Hajj Payment Code
                </label>
                <Field
                  type="text"
                  id="code"
                  name="code"
                  placeholder="Enter Hajj Payment Code"
                  className="bg-[#F7F7F7] mt-1 p-4 w-full border-0 rounded-xl  focus:border-[#44BC27]"
                />
                <ErrorMessage
                  name="code"
                  component="span"
                  className="text-red-500 mt-6 text-md"
                />
              </div>
              {data && <PaymentDetails details={paymentDetails} />}

              {data ? (
                <button
                  type="button"
                  className="absolute bottom-6 left-3 w-[94%] bg-gradient-to-r from-[#14670F] to-[#44BC27] text-white font-[600] py-3 px-4 rounded-[40px]"
                  onClick={() => handlePaymentProcessing()}
                >
                  Pay
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute bottom-6 left-3 text-center w-[94%] bg-gradient-to-r from-[#14670F] to-[#44BC27] text-white font-[600] py-3 px-4 rounded-[40px]"
                >
                  {loading ? (
                    <div className="loader mx-auto py-3"></div>
                  ) : (
                    "Search"
                  )}
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PaymentCodeForm;
