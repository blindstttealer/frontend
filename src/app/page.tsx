"use client";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setEmail(data.email);
    setPassword(data.password);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="email"
          type="text"
          placeholder="Enter email"
          options={{ required: "Email is required" }}
          error={errors?.email?.message}
        />
        <Input
          register={register}
          name="password"
          type="password"
          placeholder="Enter password"
          options={{
            required: "Password is required",
            minLength: { message: "Min length 6", value: 6 },
          }}
          error={errors?.password?.message}
        />
        <Button size="medium" color="yellow">
          Login
        </Button>
      </form>
      <div>Your login: {email}</div>
      <div>Your password: {password}</div>
    </div>
  );
}
