import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { FormWrap } from "../_components/form-wrap";
import { RegisterForm } from "../_components/register-form";

interface RegisterPageProps {}

const RegisterPage: NextPage<RegisterPageProps> = ({}) => {
  return (
    <Container>
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </Container>
  );
};

export default RegisterPage;
