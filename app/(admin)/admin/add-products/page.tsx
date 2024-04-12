import { FormWrap } from "@/app/(auth)/_components/form-wrap";
import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { AddProductForm } from "../_components/add-product-form";

interface AddProductPageProps {}

const AddProductPage: NextPage<AddProductPageProps> = ({}) => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProductPage;
