import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import styles from "../styles/Signup.module.css";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const successfulSignup = () => toast.success("You have signed up!");

  async function onSubmit(data) {
    try {
      const { username, email, password, firstName, lastName } = data;

      successfulSignup();
    } catch (error) {
      console.log(error);
    }
  }

  async function checkIfUsernameTaken(username) {
    return true;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.pageTitle}>Sign Up</div>
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
                validate: (value) => checkIfUsernameTaken(value),
              })}
              type="text"
            />
            <div className={styles.error}>{errors.username?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="firstname">First Name</label>
            <input
              {...register("firstName", {
                required: "First Name is required",
                maxLength: {
                  value: 30,
                  message: "First name must be less than 30 characters",
                },
              })}
              type="text"
            />
            <div className={styles.error}>{errors.firstName?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="lastname">Last Name</label>
            <input
              {...register("lastName", {
                required: "Last name is required",
                maxLength: {
                  value: 30,
                  message: "Last name must be less than 30 characters",
                },
              })}
              type="text"
            />
            <div className={styles.error}>{errors.lastName?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                maxLength: {
                  value: 30,
                  message: "Email must be less than 30 characters",
                },
              })}
              type="email"
            />
            <div className={styles.error}>{errors.email?.message}</div>
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
            <div className={styles.error}>{errors.password?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <button className={styles.signupButton} type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
