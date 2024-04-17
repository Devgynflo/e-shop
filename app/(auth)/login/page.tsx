import { getCurrentUser } from "@/actions/get-current-user";
import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { FormWrap } from "../_components/form-wrap";
import { LoginForm } from "../_components/login-form";

interface LoginPageProps {}

const LoginPage: NextPage<LoginPageProps> = async ({}) => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default LoginPage;
