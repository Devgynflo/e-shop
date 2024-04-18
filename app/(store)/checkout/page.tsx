"use client";

import { Container } from "@/app/components/container";
import { FormWrap } from "@/app/components/form-wrap";
import { NextPage } from "next";
import { Suspense } from "react";
import CheckoutClientPage from "../../components/store/checkout-client";
interface CheckoutPageProps {}

const CheckoutPage: NextPage<CheckoutPageProps> = ({}) => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <Suspense>
            <CheckoutClientPage />
          </Suspense>
        </FormWrap>
      </Container>
    </div>
  );
};

export default CheckoutPage;
