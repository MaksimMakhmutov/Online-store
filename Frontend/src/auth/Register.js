import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerUser } from "../actions";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../common";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

export const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const res = await registerUser({
      email: data.email,
      password: data.password,
    });
    setUser(res.user);
    navigate("/", { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 360, margin: "20px auto", display: "grid", gap: 10 }}
    >
      <h2>Register</h2>
      <Input placeholder="Email" {...register("email")} />
      <span>{errors.email?.message}</span>
      <Input placeholder="Password" type="password" {...register("password")} />
      <span>{errors.password?.message}</span>
      <Input
        placeholder="Confirm password"
        type="password"
        {...register("confirm")}
      />
      <span>{errors.confirm?.message}</span>
      <Button type="submit" disabled={isSubmitting}>
        Create account
      </Button>
    </form>
  );
};
