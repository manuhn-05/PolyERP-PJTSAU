"use client";
import { Button,  } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react"
import { FaEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { SIGN_IN_INITIAL_VALUES, USER_LOGIN_CONSTS_ARRAY, USER_LOGIN_SCHEMA, USER_SIGNIN_FORM_TYPE } from "@/constants/auth-consts";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInUser } from "@/data-handling/queries/auth-queries";
import { HTTP_RESPONSE_CODES } from "@/data-handling/endpoints/server-endpoints";
import { useAppDispatch, useAppSelector } from "@/data-handling/store/hooks/redux-hooks";
import { loginFailed, loginInitiated, loginSuccess } from "@/data-handling/store/slices/user-slice";
import { usePathname, useRouter } from "next/navigation";
import {setCookie} from "cookies-next";
import { CLIENT_ENDPOINTS } from "@/data-handling/endpoints/client-endpoints";


export default function SigninWithPassword() {
  const [isPasswordVisible, setIsPasswordVidible]=useState<boolean>(false);
  const {mutateAsync : signInUser} = useSignInUser();
  const dispatch = useAppDispatch();
  const {currentUser, isAuthenticated} = useAppSelector((state) => state?.user);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

const {register, handleSubmit,  formState : {errors }} = useForm<USER_SIGNIN_FORM_TYPE>({
resolver : zodResolver(USER_LOGIN_SCHEMA),
defaultValues : {...SIGN_IN_INITIAL_VALUES},
mode: "onTouched", 
})

useEffect(() => {
  if (isAuthenticated && currentUser) {
    // Only redirect if NOT already on sign-in
    if (pathname !== CLIENT_ENDPOINTS.LOGIN) {
      router.push(CLIENT_ENDPOINTS.DASHBOARD);
    }
  }
}, [isAuthenticated, currentUser, router]);


  const handleSubmitForm = async (data: USER_SIGNIN_FORM_TYPE) => {
    dispatch(loginInitiated());
    try {
      const res = await signInUser(data);

      if (res?.status === HTTP_RESPONSE_CODES?.OK) {
        const {token, ...user} = res?.data;
        setCookie("auth_token", token);
        dispatch(loginSuccess(user));
        setTimeout(() => {
          router.push("/dashboard");
        }, 100)
      }
    }
    catch (err: any) {
      dispatch(loginFailed(err?.response?.data?.errors));
      console.log(err);
    }

  };

  if (!mounted) return null;
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {USER_LOGIN_CONSTS_ARRAY?.map((item) => {
        const fieldName = item.name as keyof USER_SIGNIN_FORM_TYPE;
        const isFieldPassword = item.type === "password";
        return (
          <div key={item.name} className="my-[2%]">
            <label htmlFor={fieldName}>{item.label}</label>
            <div className={`flex items-center ${item.type === "password" ? "relative" : ""}`}>
            <Input
            className="border-none outline-none ring-0 focus:ring-0"
              {...register(fieldName)}
              name={item.name}

              type={ isFieldPassword ? (isPasswordVisible ? "text" : "password") : item.type}
              placeholder={item.placeholder}
              required={item.required}
            />
            {
             isFieldPassword && (
                <span onClick={() => setIsPasswordVidible(!isPasswordVisible)} className="absolute right-2 md:text-[1.2em] cursor-pointer">
                  {isPasswordVisible ? <FaEye  /> : <GoEyeClosed />}
                </span>
              )
            }
            </div>
            {errors?.[fieldName] && <p className="text-red-500 md:text-[0.8em]">{errors?.[fieldName]?.message}</p>}
          </div>
        );
      })}

      <div>
        <Button variant={"solid"} bg={"#6BBBE9"} _hover={{ bg: "#6BBBE9" }} textColor={"white"} className="hover:bg-opacity-90" type="submit">Sign In</Button>
      </div>
    </form>
  );
}
