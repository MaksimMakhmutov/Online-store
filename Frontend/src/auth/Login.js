import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../actions";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Input } from "../common";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const res = await login(data);
    setUser(res.user);
    const redirectTo =
      location.state?.from?.pathname ||
      (res.user.role === "admin" ? "/admin" : "/");
    navigate(redirectTo, { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 360, margin: "20px auto", display: "grid", gap: 10 }}
    >
      <h2>Login</h2>
      <Input placeholder="Email" {...register("email")} />
      <span>{errors.email?.message}</span>
      <Input placeholder="Password" type="password" {...register("password")} />
      <span>{errors.password?.message}</span>
      <Button type="submit" disabled={isSubmitting}>
        Login
      </Button>
    </form>
  );
};
