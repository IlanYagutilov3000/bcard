import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { editUser, editUserStatus, getUserByIdTwo } from "../services/userService";
import { UpdatedUser } from "../interfaces/UpdatedUser";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { errorMsg, successMsg } from "../services/feedback";
import { SiteTheme } from "../App";
import { useUserContext } from "../context/userContext";

interface RegularUserEditProps {

}

const RegularUserEdit: FunctionComponent<RegularUserEditProps> = () => {
    const { id } = useParams();
    const navigate: NavigateFunction = useNavigate()
    const { color, background } = useContext(SiteTheme);
    const { auth } = useUserContext()
    const [statusChange, setStatusChange] = useState<boolean>(true);

    useEffect(() => {
        getUserByIdTwo(id as string).then((res) => {
            setUserDetails(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

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
            editUser(id as string, values).then((res) => {
                successMsg("User Was Updated Successfully");
                navigate("/")
            }).catch((err) => {
                errorMsg("Opss.. sometihng went wrong")
                console.log(err)

            })
        }
    })
    return (
        <>
            <h3 className="text-center display-5 my-1">Update</h3>
            <div className="container forMediaQuary appMargin w-50">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="firstname" placeholder="firstname"
                                    name="name.first" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name.first} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="firstname">First Name*</label>
                                {formik.touched.name?.first && formik.errors.name?.first && <p className="text-danger fs-6" >{formik.errors.name.first}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="middlename" placeholder="middlename"
                                    name="name.middle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name.middle} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="middlename">Middle Name</label>
                                {formik.touched.name?.middle && formik.errors.name?.middle && <p className="text-danger fs-6" >{formik.errors.name?.middle}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="lastname" placeholder="lastname"
                                    name="name.last" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name.last} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="lastname">Last Name*</label>
                                {formik.touched.name?.last && formik.errors.name?.last && <p className="text-danger fs-6" >{formik.errors.name?.last}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="phone" placeholder="phone"
                                    name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="phone">Phone*</label>
                                {formik.touched.phone && formik.errors.phone && <p className="text-danger fs-6" >{formik.errors.phone}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="imageUrl" placeholder="imageUrl"
                                    name="image.url" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image?.url} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="imageUrl">Image Url</label>
                                {formik.touched.image?.url && formik.errors.image?.url && <p className="text-danger fs-6" >{formik.errors.image?.url}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="imageAlt" placeholder="imageAlt" name="image.alt" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image?.alt} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="imageAlt">Image Alt</label>
                                {formik.touched.image?.alt && formik.errors.image?.alt && <p className="text-danger fs-6" >{formik.errors.image?.alt}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="state" placeholder="state"
                                    name="address.state" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.state} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="state">State</label>
                                {formik.touched.address?.state && formik.errors.address?.state && <p className="text-danger fs-6" >{formik.errors.address?.state}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="country" placeholder="country" name="address.country" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.country} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="passwrod">Country*</label>
                                {formik.touched.address?.country && formik.errors.address?.country && <p className="text-danger fs-6" >{formik.errors.address?.country}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="city" placeholder="city"
                                    name="address.city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.city} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="city">City*</label>
                                {formik.touched.address?.city && formik.errors.address?.city && <p className="text-danger fs-6" >{formik.errors.address?.city}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="street" placeholder="street" name="address.street" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.street} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="street">Street*</label>
                                {formik.touched.address?.street && formik.errors.address?.street && <p className="text-danger fs-6" >{formik.errors.address?.street}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="number" className="form-control" id="housenumber" placeholder="housenumber"
                                    name="address.houseNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.houseNumber} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="housenumber">House Number*</label>
                                {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger fs-6" >{formik.errors.address?.houseNumber}</p>}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="number" className="form-control" id="zip" placeholder="zip" name="address.zip" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.zip} style={{ backgroundColor: background, color: color }} />
                                <label htmlFor="zip">Zip</label>
                                {formik.touched.address?.zip && formik.errors.address?.zip && <p className="text-danger fs-6" >{formik.errors.address?.zip}</p>}
                            </div>
                        </div>
                        {!auth?.isBusiness && (<div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                onChange={() => {
                                    editUserStatus(id as string, statusChange)
                                        .then((res) => {
                                            successMsg("You became a Business aCcount")
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            errorMsg("User Didn't Change to Business");
                                        });
                                }}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Business Account
                            </label>
                        </div>)}
                        <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-primary" >submit</button>
                    </div>
                </form>
                <div className="row g-2">
                </div>
            </div>
        </>
    );
}

export default RegularUserEdit;