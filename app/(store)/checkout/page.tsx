"use client";

import { FormWrap } from "@/app/(auth)/_components/form-wrap";
import { Container } from "@/app/components/container";
import { NextPage } from "next";
import CheckoutClientPage from "./checkout-client";

interface CheckoutPageProps {}

const CheckoutPage: NextPage<CheckoutPageProps> = ({}) => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckoutClientPage />
        </FormWrap>
      </Container>
    </div>
  );
};

export default CheckoutPage;
