import { useForm } from "react-hook-form";
import * as val from "validator";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../lib/axios";
import Header from "../Header/index";
import Footer from "../Footer";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/user/actions";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

import "./style.css";

const Register = () => {
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
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const [messageOfSignUp, setMessageOfSignUp] = useState("");
  const watchPassword = watch("password");

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    console.log(name);
    setMessageOfSignUp("Carregando...");
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        dispatch(loginUser(user));
        await updateProfile(user, {
          displayName: name,
        });
         setTimeout(() => {
           navigate("/");
         }, 1000);
        setMessageOfSignUp("Usuario Cadastrado com sucesso!");
      })
      .catch((error) => setMessageOfSignUp(error.message));
   
    setTimeout(() => {
      setMessageOfSignUp("");
    }, 5000);

    setIsSafeToReset(true);
  };

  useEffect(() => {
    if (!isSafeToReset) return;
    reset({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      privacyTerms: "",
    });
  }, [isSafeToReset, reset]);

  return (
    <div className="container">
      <div className="header-container">
        <Header />
      </div>
      <div className="form-container">
        <div className="message">{messageOfSignUp}</div>
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
            placeholder="Seu email"
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
          <label>Confirmação Da Senha</label>
          <input
            className={errors?.passwordConfirmation && "input-error"}
            type="password"
            placeholder="Repita sua senha"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === watchPassword,
            })}
          />
          {errors?.passwordConfirmation?.type === "required" && (
            <p className="error-message">
              A confirmação da senha é necessária.
            </p>
          )}

          {errors?.passwordConfirmation?.type === "validate" && (
            <p className="error-message">As senhas não correspondem.</p>
          )}
        </div>
        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              {...register("privacyTerms", {
                validate: (value) => value === true,
              })}
            />
            <label>Eu concordo com os termos de privacidade.</label>
          </div>

          {errors?.privacyTerms?.type === "validate" && (
            <p className="error-message">
              Você deve concordar com os termos de privacidade.
            </p>
          )}
        </div>
        <div className="form-group">
          <button onClick={() => handleSubmit(onSubmit)()}>
            Crie a sua conta aqui
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
