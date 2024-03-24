import React, { useContext } from "react";

import "../../normalize.css";
import "./index.css";

import Button from "../../component/button";
import BackButton from "../../component/back-button";
import Page from "../../component/auth-page";
import Header from "../../component/header";
import Heading from "../../component/heading";
import Grid from "../../component/grid";
import Field from "../../component/field";
// import FieldPassword from "../../component/field-password";
// import AnotherAction from "../../component/another-action";
import Alert from "../../component/alert";

import {
  Form,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
  // REG_EXP_NAME,
  ALERT_STATUS,
  FIELD_ERROR,
} from "../../utils/form";

import { saveSession, getTokenSession, getSession } from "../../utils/session";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { AUTH_DATA_ACTION_TYPE } from "../../App";

const RecoveryPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  class RecoveryForm extends Form {
    FIELD_NAME = {
      // FIRSTNAME: "firstname",
      // LASTNAME: "lastname",
      EMAIL: "email",
      // PASSWORD: "password",
    };
    FIELD_ERROR = {
      IS_EMPTY: "Введіть значення в поле",
      IS_BIG: "Дуже довге значення, приберіть зайве",
      EMAIL: "Введіть коректне значення e-mail адреси",
    };

    validate: (name: string, value: string) => FIELD_ERROR | null = (
      name: string,
      value: string
    ) => {
      if (value?.length < 1) {
        return FIELD_ERROR.EMPTY;
      }

      if (value?.length > 20) {
        return FIELD_ERROR.BIG;
      }

      if (name === this.FIELD_NAME.EMAIL) {
        if (!REG_EXP_EMAIL.test(String(value))) {
          return FIELD_ERROR.EMAIL;
        }
      }

      // if (name === this.FIELD_NAME.PASSWORD) {
      //   if (!REG_EXP_PASSWORD.test(String(value))) return FIELD_ERROR.PASSWORD;
      // }

      // if (name === this.FIELD_NAME.FIRSTNAME) {
      //   if (!REG_EXP_NAME.test(String(value))) {
      //     return FIELD_ERROR.FIRSTNAME;
      //   }
      // }

      // if (name === this.FIELD_NAME.LASTNAME) {
      //   if (!REG_EXP_NAME.test(String(value))) {
      //     return FIELD_ERROR.LASTNAME;
      //   }
      // }

      return null;
    };

    submit = async () => {
      if (this.disabled === true) {
        this.validateAll();
        // this.firstValidate = true;
      } else {
        this.setAlert(ALERT_STATUS.PROGRESS, "Loading...");

        try {
          const res = await fetch("http://localhost:4000/recovery", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: this.convertData(),
          });

          const data = await res.json();

          if (res.ok) {
            auth?.dispatch({
              type: AUTH_DATA_ACTION_TYPE.LOGIN,
              payload: data.session,
            });
            console.log("success", data.message);
            saveSession(data.session);
            navigate("/recovery-confirm");
          } else {
            this.setAlert(ALERT_STATUS.ERROR, data.message);
          }
        } catch (error) {
          this.setAlert(
            ALERT_STATUS.ERROR,
            "Registration failed, please try again!"
          );
        }
      }
    };

    convertData = () => {
      return JSON.stringify({
        // [this.FIELD_NAME.FIRSTNAME]: this.value[this.FIELD_NAME.FIRSTNAME],
        // [this.FIELD_NAME.LASTNAME]: this.value[this.FIELD_NAME.LASTNAME],
        [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
        // [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
      });
    };
  }

  const recovery = new RecoveryForm();
  return (
    <Page>
      <Header />
      <BackButton />

      <Heading title="Recover password" subtitle="Choose a recovery method" />
      <Grid big>
        {/* <Field
          label="Firstname"
          name="firstname"
          type="text"
          placeholder="firstname"
          onInput={(e) => signup.change(e.target.name, e.target.value)}
        />
        <Field
          label="Lastname"
          name="lastname"
          type="text"
          placeholder="lastname"
          onInput={(e) => signup.change(e.target.name, e.target.value)}
        /> */}
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="email"
          onInput={(e) => recovery.change(e.target.name, e.target.value)}
        />
        {/* <FieldPassword
          label="Password"
          name="password"
          type="password"
          placeholder="password"
          onInput={(e) => recovery.change(e.target.name, e.target.value)}
        />
        <AnotherAction
          text="Already have an account?"
          button="Sign In"
          onClick={() => navigate("/signin")}
        /> */}
        <Button text="Send code" onClick={() => recovery.submit()} disabled />
        <Alert />
      </Grid>
    </Page>
  );
};

export default RecoveryPage;
