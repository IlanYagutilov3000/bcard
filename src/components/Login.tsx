import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userLogin } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedback";
import { useUserContext } from "../context/userContext";
import useToken from "../customHooks/useToken";
import { SiteTheme } from "../App";



interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
    const { afterDecode } = useToken();
    const { setAuth, setIsBusiness, setIsAdmin, isLogedIn, setIsLogedIn } = useUserContext()
    const navigate = useNavigate()
    const { color, background } = useContext(SiteTheme);

    useEffect(() => {
        if (afterDecode && localStorage.token) {
            setIsLogedIn(true);
            navigate("/");
        } else {
            setIsLogedIn(false);
            return;
        }
    }, [afterDecode]);

    const formik: FormikValues = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8).matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){3})(?=.*[!@%$#^&*\-_+()]).{8,}$/,
                "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, at least 4 numbers and at least one of the following characters !@#$%^&*-"
            )
        }),
        onSubmit: (values) => {
            userLogin(values.email, values.password).then((res: any) => {
                /* localStorage.setItem("token", JSON.stringify(token)) */
                localStorage.token = res.data
                /* may need to change the name of this var */
                /* setTokenHolder(token) */
                setAuth(afterDecode);
                navigate("/")
                successMsg("You've Loggedin successfully")
            }).catch((err) => {
                errorMsg("Email or Password are incorrect")
                console.log(err);

            })
        }
    })
    return (
        <>
            <h3 className="text-center my-3" >LOGIN</h3>
            <div className="container w-25 forMediaQuary">
                <form onSubmit={formik.handleSubmit} >
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="email" onChange={formik.handleChange} name="email" onBlur={formik.handleBlur} value={formik.values.email} style={{ backgroundColor: background, color: color }} />
                        <label htmlFor="floatingEmail">Email*</label>
                        {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                    </div>
                    <div className="form-floating" >
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} style={{ backgroundColor: background, color: color }} />
                        <label htmlFor="floatingPassword">Password*</label>
                        {formik.touched.password && formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
                    </div>
                    <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-primary w-100 my-3" >Submit</button>
                </form>
                <div className="row g-2">
                    <div className="col-md">
                        <button className="btn btn-outline-danger w-100" onClick={() => navigate("/")}>CANCEL</button>
                    </div>
                    <div className="col-md mb-5">
                        <button className="btn btn-outline-primary w-100" onClick={() => formik.resetForm()} type="reset"><i className="fa-solid fa-arrows-rotate"></i></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
