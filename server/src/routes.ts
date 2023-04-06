import express, { Request, Response, Router } from "express";

import { sequelize } from "./models/db";
import { QueryTypes } from "sequelize";

export const appRoutes = express.Router();

const routes = Router();

interface User {
  name: String;
  email: String;
  password: String;
}

interface ExistingUsers {
  email: string;
}

interface Users extends Array<User> {}
interface ExistingUser extends Array<ExistingUsers> {}

interface ICar {
  title: string;
  price: string;
  mark: string;
  year: string;
  km: string;
  fuel: string;
  privacyTerms: string;
}

routes.get("/", async (req: Request, res: Response) => {
  res.send("Server running!");
});

routes.get("/users", async (req: Request, res: Response) => {
  const users: Users = await sequelize.query("SELECT * FROM `users`", {
    type: QueryTypes.SELECT,
  });

  res.send(users);
});

routes.post("/user/signUp", async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;

  const isValid: ExistingUser = await sequelize.query(
    `SELECT email FROM users WHERE email = "${email}"`,
    {
      type: QueryTypes.SELECT,
    }
  );

  isValid.length > 0
    ? res.send("Usuario já existente.")
    : sequelize
        .query(
          `INSERT INTO users (nome, email, senha) VALUES (
        "${name}", "${email}", "${password}"
      )`,
          {
            type: QueryTypes.INSERT,
          }
        )
        .then(() => {
          res.send("Usuario registrado com sucesso!");
        })
        .catch((error) => {
          console.log("Erro ao registrar o usuario:", error);
        });
});

routes.post("/user/signIn", async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;

  const isValid: ExistingUser = await sequelize.query(
    `SELECT email FROM users WHERE email = "${email}"`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (isValid.length > 0) {
    const query: Users = await sequelize.query(
      `SELECT email, senha, nome FROM users WHERE email = "${email}" AND senha = "${password}" AND nome = "${name}"`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (query.length > 0) {
      res.send("Login efetuado com sucesso!");
    } else {
      res.send("Erro ao fazer login, cheque seus dados e tente novamente.");
    }
  } else {
    res.send("Email não registrado.");
  }
});

routes.delete("/user/delete/", (req: Request, res: Response): void => {
  const { name, email } = req.body;
  sequelize
    .query(`DELETE FROM users WHERE nome = "${name}" AND email = "${email}"`, {
      type: QueryTypes.DELETE,
    })
    .then(() => {
      res.send("Usuario deletado com sucesso!");
    })
    .catch((error) => {
      console.log("Erro ao deletar o usuario: ", error);
    });
});

routes.patch("/user/update/:id", (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  sequelize
    .query(
      `UPDATE users 
    SET nome = "${name}", email = "${email}", senha = "${password}" 
    WHERE id = "${id}";`,
      {
        type: QueryTypes.UPDATE,
      }
    )
    .then(() => {
      res.send("Usuario atualizado com sucesso!");
    })
    .catch((error) => {
      console.log("Erro ao atualizar o usuario: ", error);
    });
});

routes.post("/user/sale", async (req: Request, res: Response) => {
  const car: ICar = req.body;
  sequelize
    .query(`INSERT INTO `, {
      type: QueryTypes.INSERT,
    })
    .then(() => {
      res.send("Usuario atualizado com sucesso!");
    })
    .catch((error) => {
      console.log("Erro ao atualizar o usuario: ", error);
    });
});
appRoutes.use(routes);
