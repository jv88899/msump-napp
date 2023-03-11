import Layout from "@/components/Layout";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "../styles/Signup.module.css";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const router = useRouter();
  const successfulSignin = () => toast.success("Successfully signed in!");

  async function onSubmit(formData) {
    try {
      const { email, password } = formData;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log(data);
      console.log(error);

      if (data && !error) successfulSignin();
      if (data && !error) router.push("/dashboard");
    } catch (error) {}
  }

  return (
    <Layout>
      <div style={{ paddingTop: "80px" }}>
        <div>
          <div>
            <h1>Sign In</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputWrapper}>
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: "Email address is required",
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
                Sign In
              </button>
            </div>
          </form>
          <p>
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
