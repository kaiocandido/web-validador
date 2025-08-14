import {
  Container,
  LoginBox,
  Subtitle,
  Input,
  Logo,
  Link,
  Paragraph,
} from "./styles";
import logo from '../../assets/Generated image.png';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from "../../services/api";
import { Button } from "../../components/Button";

export function Login() {

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    password: Yup.string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await api.post('./sessions', {
        email: data.email,
        password: data.password,
    })
    console.log(response)
}

  return (
    <Container>
      <LoginBox>
        <Logo src={logo} alt="Logo" />
        <Subtitle>Entrar</Subtitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("email")} type="email" placeholder="E-mail" />
          <Paragraph>{errors?.email?.message}</Paragraph>
          <Input {...register("password")} type="password" placeholder="Senha" />
          <Paragraph>{errors?.password?.message}</Paragraph>
          <Button type="submit">Entrar</Button>
          <Link>Esqueci minha senha</Link>
        </form>
      </LoginBox>
    </Container>
  )
}
