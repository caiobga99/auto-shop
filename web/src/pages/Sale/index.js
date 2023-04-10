import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.css";
import "../../components/Register/style.css";

import api from "../../lib/axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Sale = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const [messageOfSale, setMessageOfSale] = useState("");

  const { currentUser } = useSelector((state) => state.userReducer);

  const onSubmit = async (data) => {
    setMessageOfSale("Carregando...");
    await api.post(`/user:${currentUser.id}/sale`, data).then(({ data }) => {
      setMessageOfSale(data);
      setTimeout(() => {
        setMessageOfSale("");
      }, 5000);

      if (data === "Veiculo disponivel para venda registrado com sucesso.") {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });

    setIsSafeToReset(true);
    console.log(data);
  };

  useEffect(() => {
    if (!isSafeToReset) return;
    reset({
      title: "",
      price: "",
      mark: "",
      year: "",
      km: "",
      fuel: "",
      privacyTerms: "",
      // images: [],
    });
  }, [isSafeToReset, reset]);

  return (
    <div className="container">
      <div className="header-container">
        <Header />
      </div>
      <div className="form-container-venda">
        <div className="message">{messageOfSale}</div>
        <div className="form-group">
          <label>Titulo</label>
          <input
            className={errors?.title && "input-error"}
            type="text"
            placeholder="Seu Titulo"
            {...register("title", { required: true })}
          />
          {errors?.title?.type === "required" && (
            <p className="error-message">O título é obrigatório.</p>
          )}
        </div>
        <div className="form-group">
          <label>Preço</label>
          <input
            className={errors?.price && "input-error"}
            type="text"
            placeholder="Preço do veiculo"
            {...register("price", {
              required: true,
            })}
          />
          {errors?.price?.type === "required" && (
            <p className="error-message">O preço é obrigatório.</p>
          )}
        </div>
        <div className="form-group">
          <label>Marca</label>
          <input
            className={errors?.mark && "input-error"}
            type="text"
            placeholder="Marca do veiculo"
            {...register("mark", { required: true })}
          />

          {errors?.mark?.type === "required" && (
            <p className="error-message">A marca é obrigatória.</p>
          )}
        </div>
        <div className="form-group">
          <label>Ano</label>
          <input
            className={errors?.year && "input-error"}
            type="number"
            placeholder="Ano do veículo"
            {...register("year", {
              required: true,
              validate: (value) => value.length === 4,
            })}
          />
          {errors?.year?.type === "required" && (
            <p className="error-message">O ano do veiculo é necessário.</p>
          )}

          {errors?.year?.type === "validate" && (
            <p className="error-message">Quatro digitos necessarios.</p>
          )}
        </div>
        <div className="form-group">
          <label>Kilometros</label>
          <input
            className={errors?.km && "input-error"}
            type="number"
            placeholder="Kilometros rodados do veiculo"
            {...register("km", {
              required: true,
            })}
          />
          {errors?.km?.type === "required" && (
            <p className="error-message">
              O kilometro do veiculo é necessário.
            </p>
          )}
        </div>
        <div className="form-group">
          <label>Combustivel</label>
          <select
            className={errors?.fuel && "input-error"}
            defaultValue="0"
            {...register("fuel", { validate: (value) => value !== "0" })}
          >
            <option value="0">Selecione o combustivel...</option>
            <option value="gasolina">Gasolina</option>
            <option value="etanol">Etanol</option>
            <option value="flex">Flex</option>
            <option value="disel">Diesel</option>
          </select>

          {errors?.fuel?.type === "validate" && (
            <p className="error-message">O tipo do combustivel é necessario.</p>
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
          <button disabled={true} onClick={() => handleSubmit(onSubmit)()}>
            Registre seu veículo aqui
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sale;
