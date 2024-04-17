import { getCurrentUser } from "@/actions/get-current-user";
import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { FormWrap } from "../_components/form-wrap";
import { RegisterForm } from "../_components/register-form";

interface RegisterPageProps {}

const RegisterPage: NextPage<RegisterPageProps> = async ({}) => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default RegisterPage;
