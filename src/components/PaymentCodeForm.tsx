"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PaymentDetails from "./PaymentDetails";
import { useState } from "react";
import Fallback from "./Fallback";

const validationSchema = Yup.object().shape({
  code: Yup.string().min(1, "Hajj payment code is required"),
});

interface PaymentDetailProps {
  amount: number;
  photo_url: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  passport_number: string;
  birth_date: string;
  service_package: string;
}

const PaymentCodeForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PaymentDetailProps | null>(null);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [error, setError] = useState(false);

  const handleGettingReservation = (values: { code: string }) => {
    setLoading(true);
    const API_URL = `https://staging.eaglelionsystems.com/hajji/v1/query/${values?.code}`;
    const header = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(API_URL, {
      method: "GET",
      headers: header,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setError(false);
          setData(response?.pilgrim);
          setPaymentDetail(response?.payload);
        } else {
          setError(true);
          setData(null);
          setPaymentDetail(null);
        }
      })
      .catch(() => {
        setError(true);
        setData(null);
        setPaymentDetail(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //  ------------- HANDLE CLEARING FETCHED DETAILS ---------------------------
  const handleClearDetails = () => {
    setData(null);
    setPaymentDetail(null);
    setError(false);
  };
  //  ------------- SUPER APP WILL PROCESS THE FOLLOWING FUNCTION --------------

  const handlePaymentProcessing = () => {
    console.log("Initiating super app payment");
    console.log(paymentDetail);
    //mike you can take it from here
  };

  return (
    <div className="flex items-center justify-center ">
      <div className=" xs:w-full  md:w-1/2 lg:w-1/3 min-h-screen bg-white p-4 relative">
        <p className="text-2xl font-bold  text-black">Enter Payment Code</p>
        <p className="text-md font-medium mt-1 mb-4 text-gray-500">
          Please enter your hajj payment code and proceed the payment.
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
          {({ values, setFieldValue }) => (
            <Form className=" flex flex-col py-3 justify-between ">
              <div className="mb-5">
                <label
                  htmlFor="code"
                  className="block text-md font-medium text-black"
                >
                  Hajj Payment Code
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    id="code"
                    name="code"
                    placeholder="Enter Hajj Payment Code"
                    className="bg-[#F7F7F7] mt-1 p-4 w-full border-0 rounded-xl focus:border-[#44BC27] pr-12" // Add padding to the right for the button
                  />
                  {values.code && (
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue("code", "");
                        handleClearDetails();
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    >
                      &#x2715;
                    </button>
                  )}
                </div>

                <ErrorMessage
                  name="code"
                  component="span"
                  className="text-red-500 mt-6 text-md"
                />
              </div>
              {data ? (
                <PaymentDetails details={data} />
              ) : error ? (
                <Fallback />
              ) : null}

              {data && !error ? (
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
