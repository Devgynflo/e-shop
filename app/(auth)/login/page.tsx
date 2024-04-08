import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { FormWrap } from "../_components/form-wrap";
import { LoginForm } from "../_components/login-form";

interface Props {}

const LoginPage: NextPage<Props> = ({}) => {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  );
};

export default LoginPage;
