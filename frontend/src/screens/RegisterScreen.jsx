import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/userValidation"; // Importa las funciones de validación

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const errorMessage = validateName(value);
    setNameError(errorMessage);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const errorMessage = validateEmail(value);
    setEmailError(errorMessage);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const errorMessage = validatePassword(value);
    setPasswordError(errorMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(
      value !== password ? "Las contraseñas no coinciden" : ""
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError =
      password !== confirmPassword ? "Las contraseñas no coinciden" : "";

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setNameError(nameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      setConfirmPasswordError(confirmPasswordError);
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Registrarse</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar nombre"
            value={name}
            onChange={handleNameChange}
          ></Form.Control>
          {nameError && (
            <Message variant="danger" className="mt-1">
              {nameError}
            </Message>
          )}
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          <Form.Label>Dirección de email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresar email"
            value={email}
            onChange={handleEmailChange}
          ></Form.Control>
          {emailError && (
            <Message variant="danger" className="mt-1">
              {emailError}
            </Message>
          )}
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresar contraseña"
            value={password}
            onChange={handlePasswordChange}
          ></Form.Control>
          {passwordError && (
            <Message variant="danger" className="mt-1">
              {passwordError}
            </Message>
          )}
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          ></Form.Control>
          {confirmPasswordError && (
            <Message variant="danger" className="mt-1">
              {confirmPasswordError}
            </Message>
          )}
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Registrarse
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          ¿Ya tienes una cuenta?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;

/*
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/userValidation"; // Importa las funciones de validación

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const errorMessage = validateName(value);
    setNameError(errorMessage);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const errorMessage = validateEmail(value);
    setEmailError(errorMessage);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const errorMessage = validatePassword(value);
    setPasswordError(errorMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(
      value !== password ? "Las contraseñas no coinciden" : ""
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError =
      password !== confirmPassword ? "Las contraseñas no coinciden" : "";

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setNameError(nameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      setConfirmPasswordError(confirmPasswordError);
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Registrarse</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar nombre"
            value={name}
            onChange={handleNameChange}
          ></Form.Control>
          {nameError && <div className="mt-1 text-danger">{nameError}</div>}
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          <Form.Label>Dirección de email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresar email"
            value={email}
            onChange={handleEmailChange}
          ></Form.Control>
          {emailError && <div className="mt-1 text-danger">{emailError}</div>}
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresar contraseña"
            value={password}
            onChange={handlePasswordChange}
          ></Form.Control>
          {passwordError && (
            <div className="mt-1 text-danger">{passwordError}</div>
          )}
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          ></Form.Control>
          {confirmPasswordError && (
            <div className="mt-1 text-danger">{confirmPasswordError}</div>
          )}
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Registrarse
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          ¿Ya tienes una cuenta?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
*/

/*

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/userValidation"; // Importa las funciones de validación

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const errorMessage = validateName(value);
    setNameError(errorMessage);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const errorMessage = validateEmail(value);
    setEmailError(errorMessage);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const errorMessage = validatePassword(value);
    setPasswordError(errorMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(
      value !== password ? "Las contraseñas no coinciden" : ""
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError =
      password !== confirmPassword ? "Las contraseñas no coinciden" : "";

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setNameError(nameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      setConfirmPasswordError(confirmPasswordError);
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Registrarse</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar nombre"
            value={name}
            onChange={handleNameChange}
          ></Form.Control>
          {nameError && (
            <Message variant="danger" className="mt-1">
              {nameError}
            </Message>
          )}
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          <Form.Label>Dirección de email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresar email"
            value={email}
            onChange={handleEmailChange}
          ></Form.Control>
          {emailError && (
            <Message variant="danger" className="mt-1">
              {emailError}
            </Message>
          )}
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresar contraseña"
            value={password}
            onChange={handlePasswordChange}
          ></Form.Control>
          {passwordError && (
            <Message variant="danger" className="mt-1">
              {passwordError}
            </Message>
          )}
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          ></Form.Control>
          {confirmPasswordError && (
            <Message variant="danger" className="mt-1">
              {confirmPasswordError}
            </Message>
          )}
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Registrarse
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          ¿Ya tienes una cuenta?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
*/
