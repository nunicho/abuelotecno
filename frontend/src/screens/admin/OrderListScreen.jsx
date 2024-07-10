import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: deleteLoading }] = useDeleteOrderMutation();
  const [updatedOrders, setUpdatedOrders] = useState([]);

  useEffect(() => {
    if (orders) {
      setUpdatedOrders(orders);
    }
  }, [orders]);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("¿Estás seguro de eliminar esta orden?")) {
      try {
        await deleteOrder(orderId);
        const updatedOrdersList = updatedOrders.filter(
          (order) => order._id !== orderId
        );
        setUpdatedOrders(updatedOrdersList);
        // Actualizar la lista de órdenes refetch para obtener los datos actualizados desde el backend
        refetch();
      } catch (error) {
        console.error("Error al eliminar la orden:", error);
      }
    }
  };

  return (
    <>
      <h1>Órdenes</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>PAGADA</th>
              <th>ENTREGADA</th>
              <th>EXPIRADA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {updatedOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isExpired ? (
                    <span style={{ color: "red" }}>Sí</span>
                  ) : (
                    <span>No</span>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Detalles
                    </Button>
                  </LinkContainer>
                  {order.isExpired && (
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteOrder(order._id)}
                      disabled={deleteLoading}
                    >
                      Eliminar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;

/*
import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: deleteLoading }] = useDeleteOrderMutation();
  const [updatedOrders, setUpdatedOrders] = useState([]);

  useEffect(() => {
    if (orders) {
      setUpdatedOrders(orders);
    }
  }, [orders]);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("¿Estás seguro de eliminar esta orden?")) {
      try {
        await deleteOrder(orderId);
        const updatedOrdersList = updatedOrders.filter(
          (order) => order._id !== orderId
        );
        setUpdatedOrders(updatedOrdersList);
      } catch (error) {
        console.error("Error al eliminar la orden:", error);
      }
    }
  };

  return (
    <>
      <h1>Órdenes</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>PAGADA</th>
              <th>ENTREGADA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {updatedOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Detalles
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDeleteOrder(order._id)}
                    disabled={deleteLoading}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
*/
