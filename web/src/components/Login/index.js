import { useForm } from "react-hook-form";
import * as val from "validator";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../lib/axios";
import Header from "../Header/index";
import Footer from "../Footer/index";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/user/actions";

import "./style.css";

const Login = () => {
  const { currentUser } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    return;
  }, [currentUser, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const [messageOfSignIn, setMessageOfSignIn] = useState("");

  const onSubmit = async (data) => {
    setMessageOfSignIn("Carregando...");
    const { name, email } = data;
    await api.post("/user/signIn", data).then(({ data }) => {
      setMessageOfSignIn(data);
      setTimeout(() => {
        setMessageOfSignIn("");
      }, 5000);
      if (data === "Login efetuado com sucesso!") {
        dispatch(loginUser({ name: name, email: email }));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });

    setIsSafeToReset(true);
  };

  useEffect(() => {
    if (!isSafeToReset) return;
    reset();
  }, [isSafeToReset, reset]);

  return (
    <div className="container">
      <div className="header-container">
        <Header />
      </div>
      <div className="form-container">
        <div className="message">{messageOfSignIn}</div>
        <div className="form-group">
          <label>Nome</label>
          <input
            className={errors?.name && "input-error"}
            type="text"
            placeholder="Seu nome"
            {...register("name", { required: true })}
          />
          {errors?.name?.type === "required" && (
            <p className="error-message">O nome é obrigatório.</p>
          )}
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <input
            className={errors?.email && "input-error"}
            type="email"
            placeholder="Seu e-mail"
            {...register("email", {
              required: true,
              validate: (value) => val.default.isEmail(value),
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="error-message">O e-mail é obrigatório.</p>
          )}

          {errors?.email?.type === "validate" && (
            <p className="error-message">Email inválido.</p>
          )}
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            className={errors?.password && "input-error"}
            type="password"
            placeholder="Senha"
            {...register("password", { required: true, minLength: 7 })}
          />

          {errors?.password?.type === "required" && (
            <p className="error-message">A senha é obrigatória.</p>
          )}

          {errors?.password?.type === "minLength" && (
            <p className="error-message">
              A senha precisa ter pelo menos 7 caracteres.
            </p>
          )}
        </div>
        <div className="form-group">
          <button onClick={() => handleSubmit(onSubmit)()}>Entrar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
