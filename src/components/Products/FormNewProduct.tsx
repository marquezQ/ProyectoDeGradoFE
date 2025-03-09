import { useState, ChangeEvent } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { PhotoCamera } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { createProduct } from "../../services/workerApi";
interface Props {
    workerID: string,
    fetchProducts: () => void,
    closeForm: () => void
}

function FormNewProduct({workerID, fetchProducts, closeForm}: Props) {
    const [productImage, setProductImage] = useState<File | null>(null);
    const { handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched } =
        useFormik({
            initialValues: {
                name: "",
                stock: "",
                price: "",
                image: null as File | null,
            },
            validationSchema,
            onSubmit: async (values) => {
                const dataSend = new FormData();
                dataSend.append("trabajador_id", workerID)
                dataSend.append("name", values.name);
                dataSend.append("stock", values.stock);
                dataSend.append("price", values.price);

                if (values.image) {
                    dataSend.append("image", values.image);
                }
                try {
                    await createProduct(dataSend);
                    closeForm();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Producto registrado con éxito",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    fetchProducts();  
                } catch (error) {
                    closeForm();
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error al registrar el producto",
                        showConfirmButton: true,
                    });
                    throw error;
                }
            },
        });

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFieldValue("image", file);
        setProductImage(file);
    };
    return (
    <>
        
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-4 md:p-6 w-full"
            >
                {/* Campo Nombre */}
                <TextField
                    name="name"
                    label="Nombre del Producto"
                    variant="outlined"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />

                {/* Campo Stock */}
                <TextField
                    name="stock"
                    label="Cantidad de productos"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.stock && Boolean(errors.stock)}
                    helperText={touched.stock && errors.stock}
                />

                {/* Campo Precio */}
                <TextField
                    name="price"
                    label="Precio"
                    variant="outlined"
                    fullWidth
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                />

                {/* Subir Imagen */}
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            position: "relative",
                            width: 200,
                            height: 200,
                            borderRadius: 2,
                            border: "1px solid #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        {productImage ? (
                            <>
                                <img
                                    src={URL.createObjectURL(productImage)}
                                    alt="Producto"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                <HighlightOffOutlinedIcon
                                    sx={{
                                        position: "absolute",
                                        top: 4,
                                        right: 4,
                                        backgroundColor: "transparent",
                                        color: "white",
                                        "&:hover": { color: "gray" },
                                    }}
                                    onClick={() => {
                                        setFieldValue("image", null);
                                        setProductImage(null);
                                    }}
                                />
                            </>
                        ) : (
                            <PhotoCamera sx={{ fontSize: 100, color: "#ccc" }} />
                        )}
                    </Box>
                    {/* Mostrar error de imagen en rojo */}
                    {touched.image && errors.image && (
                        <Typography variant="body2" color="error">
                            {errors.image}
                        </Typography>
                    )}
                    <Button variant="contained" component="label" color="primary">
                        Subir Imagen
                        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                    </Button>
                </Box>

                {/* Botón de Registro */}
                <div className="flex justify-end gap-1">
                <Button variant="outlined" onClick={closeForm}>Cancelar</Button>
                <Button type="submit" variant="contained" color="primary">
                    Guardar
                </Button>
                </div>
            </form>
        </div>
    </>
    )
}

export default FormNewProduct

const validationSchema = Yup.object({
    name: Yup.string().required("El nombre del producto es obligatorio"),
    stock: Yup.number()
        .required("El stock es obligatorio")
        .min(0, "El stock no puede ser negativo"),
    price: Yup.number()
        .required("El precio es obligatorio")
        .min(0, "El precio no puede ser negativo"),
    image: Yup.mixed()
        .required("La imagen del producto es obligatoria")
        .test("fileType", "Solo se permiten imágenes", (value) => {
            return value && value instanceof File;
        }),
});
