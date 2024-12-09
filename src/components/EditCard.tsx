import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { createNewCard, getCardById, updateCard } from "../services/cardService";
import { successMsg, errorMsg } from "../services/feedback";
import * as yup from "yup";

interface EditCardProps {
    onHide: Function;
    refresh: Function;
    cardId: string;
}

const EditCard: FunctionComponent<EditCardProps> = ({ onHide, refresh, cardId }) => {
    let [cardDetails, setCardDetails] = useState<Card>({
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        image: {
            url: "",
            alt: "",
        },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0
        }
    });

    useEffect(() => {
        getCardById(cardId).then((res) => {
            setCardDetails(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const formik: FormikValues = useFormik<Card>({
        initialValues: {
            title: cardDetails.title,
            subtitle: cardDetails.subtitle,
            description: cardDetails.description,
            phone: cardDetails.phone,
            email: cardDetails.email,
            web: cardDetails.web,
            image: {
                url: cardDetails.image?.url || "",
                alt: cardDetails.image?.alt || ""
            },
            address: {
                state: cardDetails.address.state,
                country: cardDetails.address.country,
                city: cardDetails.address.city,
                street: cardDetails.address.street,
                houseNumber: cardDetails.address.houseNumber,
                zip: cardDetails.address.zip
            }
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().required().min(2),
            subtitle: yup.string().required().min(2),
            description: yup.string().required().min(2),
            phone: yup.string().required().matches(/^05[0-9]{1}-?[0-9]{7}$/, "Invalid phone format"),
            email: yup.string().required().email(),
            web: yup.string(),
            image: yup.object({
                url: yup.string(),
                alt: yup.string(),
            }),
            address: yup.object({
                state: yup.string(),
                country: yup.string().required("country is a required field"),
                city: yup.string().required("city is a required field"),
                street: yup.string().required("street is a required field"),
                houseNumber: yup.number().required("hosue number is a required field"),
                zip: yup.number(),
            }),

        }),
        onSubmit: (values) => {
            updateCard(cardId, values).then(() => {
                successMsg("Card Has Been Updated Successfully");
                onHide();
                refresh();
            }).catch((err) => {
                console.log(err);
                errorMsg("Something Went Wrong")

            })
        }
    })
    return (
        <>
            <h3 className="text-center display-5 my-3">Update Card</h3>
            <div className="container forMediaQuary w-50">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="title" placeholder="title"
                                    name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
                                <label htmlFor="title">Titile*</label>
                                {formik.touched.title && formik.errors.title && <p className="text-danger fs-6" >{formik.errors.title}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="subtitle" placeholder="subtitle"
                                    name="subtitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.subtitle} />
                                <label htmlFor="subtitle">Subtitle*</label>
                                {formik.touched.subtitle && formik.errors.subtitle && <p className="text-danger fs-6" >{formik.errors.subtitle}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="description" placeholder="description"
                                    name="description" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} />
                                <label htmlFor="description">Description*</label>
                                {formik.touched.description && formik.errors.description && <p className="text-danger fs-6" >{formik.errors.description}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="phone" placeholder="phone"
                                    name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
                                <label htmlFor="phone">Phone*</label>
                                {formik.touched.phone && formik.errors.phone && <p className="text-danger fs-6" >{formik.errors.phone}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="email" className="form-control" id="email" placeholder="Email"
                                    name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                <label htmlFor="email">Email*</label>
                                {formik.touched.email && formik.errors.email && <p className="text-danger fs-6" >{formik.errors.email}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="web" placeholder="web" name="web" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.web} />
                                <label htmlFor="passwrod">Web</label>
                                {formik.touched.web && formik.errors.web && <p className="text-danger fs-6" >{formik.errors.web}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="imageUrl" placeholder="imageUrl"
                                    name="image.url" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image?.url} />
                                <label htmlFor="imageUrl">Image Url</label>
                                {formik.touched.image?.url && formik.errors.image?.url && <p className="text-danger fs-6" >{formik.errors.image?.url}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="imageAlt" placeholder="imageAlt" name="image.alt" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image?.alt} />
                                <label htmlFor="imageAlt">Image Alt</label>
                                {formik.touched.image?.alt && formik.errors.image?.alt && <p className="text-danger fs-6" >{formik.errors.image?.alt}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="state" placeholder="state"
                                    name="address.state" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.state} />
                                <label htmlFor="state">State</label>
                                {formik.touched.address?.state && formik.errors.address?.state && <p className="text-danger fs-6" >{formik.errors.address?.state}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="country" placeholder="country" name="address.country" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.country} />
                                <label htmlFor="passwrod">Country*</label>
                                {formik.touched.address?.country && formik.errors.address?.country && <p className="text-danger fs-6" >{formik.errors.address?.country}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="city" placeholder="city"
                                    name="address.city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.city} />
                                <label htmlFor="city">City*</label>
                                {formik.touched.address?.city && formik.errors.address?.city && <p className="text-danger fs-6" >{formik.errors.address?.city}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="street" placeholder="street" name="address.street" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.street} />
                                <label htmlFor="street">Street*</label>
                                {formik.touched.address?.street && formik.errors.address?.street && <p className="text-danger fs-6" >{formik.errors.address?.street}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="number" className="form-control" id="housenumber" placeholder="housenumber"
                                    name="address.houseNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.houseNumber} />
                                <label htmlFor="housenumber">House Number*</label>
                                {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger fs-6" >{formik.errors.address?.houseNumber}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="number" className="form-control" id="zip" placeholder="zip" name="address.zip" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.zip} />
                                <label htmlFor="zip">Zip</label>
                                {formik.touched.address?.zip && formik.errors.address?.zip && <p className="text-danger fs-6" >{formik.errors.address?.zip}</p>}
                            </div>
                        </div>
                        <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-primary" >submit</button>
                    </div>
                </form>
                <div className="row g-2">
                    <div className="col-md mb-5">
                        <button className="btn btn-outline-primary w-100" onClick={() => formik.resetForm()} type="reset" ><i className="fa-solid fa-arrows-rotate"></i></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCard;