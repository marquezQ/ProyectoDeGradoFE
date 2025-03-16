import { useState, ChangeEvent, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { PhotoCamera } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { createProduct, updateProduct } from "../../services/workerApi";
import { Product } from "../../Interfaces/ProductInterface";

interface Props {
    workerID: string;
    fetchProducts: () => void;
    closeForm: () => void;
    productToEdit?: Product | null;
}

function FormNewProduct({ workerID, fetchProducts, closeForm, productToEdit }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(productToEdit?.image || null);
    
    const formik = useFormik({
        initialValues: {
            name: productToEdit?.name || "",
            stock: productToEdit?.stock?.toString() || "",
            price: productToEdit?.price?.toString() || "",
            image: null as File | null,
        },
        validationSchema: getValidationSchema(!!productToEdit),
        onSubmit: async (values) => {
            const dataSend = new FormData();
            dataSend.append("trabajador_id", workerID);
            dataSend.append("name", values.name);
            dataSend.append("stock", values.stock);
            dataSend.append("price", values.price);
            
            if (values.image) {
                dataSend.append("image", values.image);
            }
            
            try {
                if (productToEdit) {
                    dataSend.append("_method", "PUT");
                    await updateProduct(dataSend, productToEdit.id);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Actualizado con éxito",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    await createProduct(dataSend);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registrado con éxito",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                fetchProducts();
                closeForm();
            } catch {
                closeForm();
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Ocurrió un error: ",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
    });
    
    useEffect(() => {
        if (productToEdit?.image) {
            setPreviewImage(productToEdit.image);
        }
    }, [productToEdit]);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (!file) return;
        
        formik.setFieldValue("image", file);
        const objectURL = URL.createObjectURL(file);
        setPreviewImage(objectURL);
    };
    
    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
            <TextField
                name="name"
                label="Nombre del Producto"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                name="stock"
                label="Cantidad"
                fullWidth
                type="number"
                value={formik.values.stock}
                onChange={formik.handleChange}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
            />
            <TextField
                name="price"
                label="Precio"
                fullWidth
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
            />
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box position="relative" width={200} height={200} borderRadius={2} border="1px solid #ccc" display="flex" alignItems="center" justifyContent="center">
                    {previewImage ? (
                        <>
                            <img src={previewImage} alt="Producto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <HighlightOffOutlinedIcon
                                sx={{ position: "absolute", top: 4, right: 4, cursor: "pointer" }}
                                onClick={() => {
                                    URL.revokeObjectURL(previewImage);
                                    formik.setFieldValue("image", null);
                                    setPreviewImage(null);
                                }}
                            />
                        </>
                    ) : (
                        <PhotoCamera sx={{ fontSize: 100, color: "#ccc" }} />
                    )}
                </Box>
                <Button variant="contained" component="label">
                    Subir Imagen
                    <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                </Button>
                {formik.touched.image && formik.errors.image && (
                    <Typography color="error">{formik.errors.image}</Typography>
                )}
            </Box>
            <Box display="flex" justifyContent="end" gap="0.5rem">
                <Button variant="outlined" onClick={closeForm}>Cancelar</Button>
                <Button type="submit" variant="contained" color="primary">{productToEdit ? "Actualizar" : "Guardar"}</Button>
            </Box>
        </form>
    );
}

export default FormNewProduct;

const getValidationSchema = (isEditMode: boolean) =>
    Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        stock: Yup.number().required("El stock es obligatorio").min(0, "No puede ser negativo"),
        price: Yup.number().required("El precio es obligatorio").min(0, "No puede ser negativo"),
        image: isEditMode
            ? Yup.mixed().notRequired()
            : Yup.mixed().required("La imagen es obligatoria").test("fileType", "Solo imágenes", (value) => {
                return value instanceof File;
            }),
    });
