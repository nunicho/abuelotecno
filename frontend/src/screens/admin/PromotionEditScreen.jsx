import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetPromotionDetailQuery,
  useUpdatePromotionMutation,
  useTogglePromotionMutation,
} from "../../slices/promotionsApiSlice";

const PromotionEditScreen = () => {
  const { id: promotionId } = useParams();

  const [name, setName] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [active, setActive] = useState(false);

  const {
    data: promotion,
    isLoading,
    refetch,
    error,
  } = useGetPromotionDetailQuery(promotionId);

  const [updatePromotion, { isLoading: loadingUpdate }] =
    useUpdatePromotionMutation();
  const [togglePromotionStatus, { isLoading: loadingToggle }] =
    useTogglePromotionMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (promotion) {
      setName(promotion.name);
      setDiscountPercentage(promotion.discountPercentage);
      setStartDate(promotion.startDate);
      setEndDate(promotion.endDate);
      setActive(promotion.active);
    }
  }, [promotion]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDiscountPercentageChange = (e) =>
    setDiscountPercentage(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePromotion({
        promotionId,
        name,
        discountPercentage,
        startDate,
        endDate,
      }).unwrap();
      toast.success("Promoción actualizada");
      refetch();
      navigate("/admin/promotions");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const toggleStatusHandler = async () => {
    try {
      await togglePromotionStatus({ promotionId, active: !active }).unwrap();
      setActive(!active);
      toast.success(
        `Promoción ${!active ? "activada" : "desactivada"} exitosamente`
      );
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/promotions" className="btn btn-light my-3">
        Regresar
      </Link>
      <FormContainer>
        <h1>Editar promoción</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar nombre"
                value={name}
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group controlId="discountPercentage" className="my-2">
              <Form.Label>Descuento (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresar descuento"
                value={discountPercentage}
                onChange={handleDiscountPercentageChange}
              />
            </Form.Group>
            <Form.Group controlId="startDate" className="my-2">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingresar fecha de inicio"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Form.Group>
            <Form.Group controlId="endDate" className="my-2">
              <Form.Label>Fecha de finalización</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingresar fecha de finalización"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Actualizar
            </Button>
            <Button
              type="button"
              variant={active ? "danger" : "success"}
              className="my-2"
              onClick={toggleStatusHandler}
              disabled={loadingToggle}
            >
              {active ? "Desactivar" : "Activar"}
            </Button>
            <Button
              type="button"
              variant="info"
              className="my-2"
              onClick={() =>
                navigate(`/admin/promotions/${promotionId}/products`)
              }
            >
              Productos
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PromotionEditScreen;
