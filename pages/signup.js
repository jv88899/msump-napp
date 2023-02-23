import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import styles from "../styles/Signup.module.css";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const router = useRouter();

  const successfulSignup = () => toast.success("You have signed up!");

  async function onSubmit(formData) {
    try {
      const { username, email, password, fullName } = formData;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: fullName,
            avatar_url: null,
          },
        },
      });

      console.log(data);
      console.log(error);

      if (data && !error) successfulSignup();
      if (data && !error) router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  async function checkIfUsernameTaken(username) {
    try {
      let { data, error } = await supabase
        .from("usernames")
        .select("*")
        .eq("username", username);

      console.log("data", data);
      console.log("error", error);

      if (data.length === 0) {
        return true;
      } else if (data.length > 0) {
        return "Sorry, but that username is not available";
      }
    } catch (error) {}
  }

  console.log(checkIfUsernameTaken("test"));

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.pageTitle}>
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <label htmlFor="username">Username</label>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be less than 20 characters",
                },
                validate: (value) => {
                  return checkIfUsernameTaken(value);
                },
              })}
              type="text"
            />
            <div className={styles.error}>{errors.username?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="fullname">Full Name</label>
            <input
              {...register("fullName", {
                required: "Full Name is required",
                maxLength: {
                  value: 30,
                  message: "Full name must be less than 30 characters",
                },
              })}
              type="text"
            />
            <div className={styles.error}>{errors.fullName?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                maxLength: {
                  value: 99,
                  message: "Email must be less than 99 characters",
                },
              })}
              type="email"
            />
            <div className={styles.error}>
              <p>{errors.email?.message}</p>
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password must be at least 30 characters",
                },
              })}
              type="password"
            />
            <div className={styles.error}>
              <p>{errors.password?.message}</p>
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <button className={styles.signupButton} type="submit">
              Sign Up
            </button>
          </div>
        </form>
        Already have an account? <Link href="/signin">Sign in instead</Link>.
      </div>
    </div>
  );
}
