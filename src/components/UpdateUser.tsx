import { FunctionComponent, useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { editUser, getUserByIdTwo } from "../services/userService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { errorMsg, successMsg } from "../services/feedback";
import { useUserContext } from "../context/userContext";
import { UpdatedUser } from "../interfaces/UpdatedUser";



interface UpdateUserProps {
    onHide: Function;
    refresh: Function;
    userId: string
}

const UpdateUser: FunctionComponent<UpdateUserProps> = ({ onHide, refresh, userId }) => {
    const navigate: NavigateFunction = useNavigate()
    const { auth } = useUserContext()
    let [userDetails, setUserDetails] = useState<UpdatedUser>({
        name: {
            first: "",
            middle: "",
            last: ""
        },
        phone: "",
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
            zip: 0,
        },
    })
    useEffect(() => {
        getUserByIdTwo(userId).then((res) => setUserDetails(res.data)).catch((err) => {
            console.log(err);
        })
    }, []);

    const formik: FormikValues = useFormik<UpdatedUser>({
        initialValues: {
            name: {
                first: userDetails.name.first,
                middle: userDetails.name.middle,
                last: userDetails.name.last
            },
            phone: userDetails.phone,
            image: {
                url: userDetails?.image?.url || "",
                alt: userDetails?.image?.alt || "",
            },
            address: {
                state: userDetails.address.state,
                country: userDetails.address.country,
                city: userDetails.address.city,
                street: userDetails.address.street,
                houseNumber: userDetails.address.houseNumber,
                zip: userDetails.address.zip
            },
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.object({
                first: yup.string().required("name is a required field").min(2),
                middle: yup.string(),
                last: yup.string().required("last name is a required field"),
            }),
            phone: yup.string().required().matches(/^05[0-9]{1}-?[0-9]{7}$/, "Invalid phone format"),
            /*  email: yup.string().required().email(),
             password: yup
                 .string()
                 .required()
                 .min(8)
                 .matches(
                     /^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){4})(?=.*[!@%$#^&*\-_+()]).{8,}$/,
                     "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, at least 4 numbers and at least one of the following characters !@#$%^&*-"
                 ), */
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
            /* isBusiness: yup.boolean() */
        }),
        onSubmit: (values) => {

            editUser(userId, values).then((res) => {
                successMsg("User Was Updated Successfully");
                onHide();
                refresh();
            }).catch((err) => {
                errorMsg("Opss.. sometihng went wrong")
                console.log(err)

            })
        }
    })
    return (
        <>
            <h3 className="text-center display-5 my-3">REGISTER</h3>
            <div className="container forMediaQuary w-50">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="firstname" placeholder="firstname"
                                    name="name.first" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name.first} />
                                <label htmlFor="firstname">First Name*</label>
                                {formik.touched.name?.first && formik.errors.name?.first && <p className="text-danger fs-6" >{formik.errors.name.first}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="middlename" placeholder="middlename"
                                    name="name.middle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name.middle} />
                                <label htmlFor="middlename">Middle Name</label>
                                {formik.touched.name?.middle && formik.errors.name?.middle && <p className="text-danger fs-6" >{formik.errors.name?.middle}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="lastname" placeholder="lastname"
                                    name="name.last" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name.last} />
                                <label htmlFor="lastname">Last Name*</label>
                                {formik.touched.name?.last && formik.errors.name?.last && <p className="text-danger fs-6" >{formik.errors.name?.last}</p>}
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
                    {/* <div className="row g-2 mb-3">
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
                                <input type="password" className="form-control" id="password" placeholder="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                <label htmlFor="passwrod">Password*</label>
                                {formik.touched.password && formik.errors.password && <p className="text-danger fs-6" >{formik.errors.password}</p>}
                            </div>
                        </div>
                    </div> */}
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
                        {/*  <div>
                            <input type="checkbox" name="isBusiness" id="isBusiness" checked={formik.values.isBusiness} onChange={formik.handleChange} />
                            <label htmlFor="isBusiness" className="ms-2">Signup as business</label>
                        </div> */}
                        <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-primary" >submit</button>
                    </div>
                </form>
                <div className="row g-2">
                    {/* <div className="col-md">
                        <button className="btn btn-outline-danger w-100" onClick={() => navigate("/")}>CANCEL</button>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default UpdateUser;