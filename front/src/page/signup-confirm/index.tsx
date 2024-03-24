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

import Alert from "../../component/alert";

import { Form, ALERT_STATUS, FIELD_ERROR } from "../../utils/form";

import { saveSession, getTokenSession } from "../../utils/session";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { AUTH_DATA_ACTION_TYPE } from "../../App";

const SignupConfirmPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const email = auth?.state.user.email;

  const navigate = useNavigate();

  // const handleResend = async () => {
  //   try {
  //     const res = await fetch(`/resend-code?email=${email}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //     } else {
  //       signupConfirm.setAlert(ALERT_STATUS.ERROR, data.message);
  //     }
  //   } catch (error) {
  //     signupConfirm.setAlert(
  //       ALERT_STATUS.ERROR,
  //       "Confirmation failed, please try again!"
  //     );
  //   }
  // };

  class SignupConfirmForm extends Form {
    FIELD_NAME = {
      CODE: "code",
    };
    FIELD_ERROR = {
      IS_EMPTY: "Введіть значення в поле",
      IS_BIG: "Дуже довге значення, приберіть зайве",
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

      return null;
    };
    submit = async () => {
      if (this.disabled === true) {
        this.validateAll();
        this.firstValidate = true;
      } else {
        console.log(this.value);
        this.setAlert(ALERT_STATUS.PROGRESS, "Loading...");
        try {
          const res = await fetch("http://localhost:4000/signup-confirm", {
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
            saveSession(data.session);
            navigate("/balance");
          } else {
            this.setAlert(ALERT_STATUS.ERROR, data.message);
          }
        } catch (error) {
          this.setAlert(
            ALERT_STATUS.ERROR,
            "Confirmation failed, please try again!"
          );
        }
      }
    };
    convertData = () => {
      return JSON.stringify({
        [this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
        token: getTokenSession(),
      });
    };
  }

  const signupConfirm = new SignupConfirmForm();
  return (
    <Page>
      <Header />
      <BackButton />

      <Heading title="Confirm account" subtitle="Write the code you received" />
      <Grid big>
        <Field
          label="Code"
          name="code"
          type="number"
          placeholder="Code"
          onInput={(e) => signupConfirm.change(e.target.name, e.target.value)}
        />

        <Button
          disabled
          text="Confirm"
          onClick={() => signupConfirm.submit()}
        />
        <Alert />
      </Grid>
    </Page>
  );
};

export default SignupConfirmPage;
