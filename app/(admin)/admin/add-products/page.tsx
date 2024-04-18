import { Container } from "@/app/components/container";
import { FormWrap } from "@/app/components/form-wrap";
import { NextPage } from "next";
import { AddProductForm } from "../../../components/admin/add-product-form";

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
