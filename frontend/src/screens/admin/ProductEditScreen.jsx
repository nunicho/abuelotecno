import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import {
  validateName,
  validatePrice,
  validateDescription,
  validateImage,
  validateBrand,
  validateCategory,
  validateCountInStock,
} from "../../utils/productEditValidation";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [brand, setBrand] = useState("");
  const [brandError, setBrandError] = useState("");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [countInStockError, setCountInStockError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toFixed(2)); // Establecer con dos decimales
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const errorMessage = validateName(value);
    setNameError(errorMessage);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    const errorMessage = validatePrice(value);
    setPriceError(errorMessage);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    const errorMessage = validateDescription(value);
    setDescriptionError(errorMessage);
  };

  const handleImageChange = (e) => {
    const value = e.target.value;
    setImage(value);
    const errorMessage = validateImage(value);
    setImageError(errorMessage);
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand(value);
    const errorMessage = validateBrand(value);
    setBrandError(errorMessage);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    const errorMessage = validateCategory(value);
    setCategoryError(errorMessage);
  };

  const handleCountInStockChange = (e) => {
    const value = e.target.value;
    setCountInStock(value);
    const errorMessage = validateCountInStock(value);
    setCountInStockError(errorMessage);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const priceError = validatePrice(price);
    const imageError = validateImage(image);
    const brandError = validateBrand(brand);
    const categoryError = validateCategory(category);
    const countInStockError = validateCountInStock(countInStock);
    const descriptionError = validateDescription(description);

    if (
      nameError ||
      priceError ||
      imageError ||
      brandError ||
      categoryError ||
      countInStockError ||
      descriptionError
    ) {
      setNameError(nameError);
      setPriceError(priceError);
      setImageError(imageError);
      setBrandError(brandError);
      setCategoryError(categoryError);
      setCountInStockError(countInStockError);
      setDescriptionError(descriptionError);
      return;
    }

    try {
      await updateProduct({
        productId,
        name,
        price: parseFloat(price).toFixed(2), // Asegurarse de enviar con dos decimales
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success("Producto actualizado");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageError(""); // Limpiar el error de imagen después de una carga exitosa
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      // Limpiar el valor del input de tipo archivo para eliminar el nombre del archivo seleccionado
      e.target.value = null;
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Regresar
      </Link>
      <FormContainer>
        <h1>Editar producto</h1>
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
              {nameError && (
                <Message variant="danger" className="mt-1">
                  {nameError}
                </Message>
              )}
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Ingresar precio"
                value={price}
                onChange={handlePriceChange}
              />
              {priceError && (
                <Message variant="danger" className="mt-1">
                  {priceError}
                </Message>
              )}
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar imagen"
                value={image}
                onChange={handleImageChange}
              />
              <Form.Control
                label="Elegir archivo"
                onChange={uploadFileHandler}
                type="file"
              />
              {imageError && (
                <Message variant="danger" className="mt-1">
                  {imageError}
                </Message>
              )}
            </Form.Group>
            {loadingUpload && <Loader />}

            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar marca"
                value={brand}
                onChange={handleBrandChange}
              />
              {brandError && (
                <Message variant="danger" className="mt-1">
                  {brandError}
                </Message>
              )}
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresar stock"
                value={countInStock}
                onChange={handleCountInStockChange}
              />
              {countInStockError && (
                <Message variant="danger" className="mt-1">
                  {countInStockError}
                </Message>
              )}
            </Form.Group>

            <Form.Group controlId="category" className="my-2">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar categoría"
                value={category}
                onChange={handleCategoryChange}
              />
              {categoryError && (
                <Message variant="danger" className="mt-1">
                  {categoryError}
                </Message>
              )}
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingresar descripción"
                value={description}
                onChange={handleDescriptionChange}
              />
              {descriptionError && (
                <Message variant="danger" className="mt-1">
                  {descriptionError}
                </Message>
              )}
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Actualizar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;

/*
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);


  
  const submitHandler = async (e) => {

    const formattedPrice = parseFloat(price).toFixed(2);

    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price: formattedPrice,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Producto actualizado");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Regresar
      </Link>
      <FormContainer>
        <h1>Editar producto</h1>
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
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01" // Esto permite la entrada de decimales
                placeholder="Ingresar precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Elegir archivo"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
            </Form.Group>
            {loadingUpload && <Loader />}

            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresar stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="my-2">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
*/
