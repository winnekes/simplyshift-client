import { Layout } from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../constants/colors";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/auth-context";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const auth = useAuthContext();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    auth.login({ email, password });
    if (auth.token) {
      await router.push("/calendar");
    }
  });

  return (
    <Layout title="Login">
      <h3 className="title is-3 has-text-primary">Login</h3>

      <div className="columns is-vcentered is-variable is-8">
        <div className="column">
          <form onSubmit={onSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref={register({ required: "This field is required" })}
                  className="input"
                />
                <p className="help is-danger">
                  {errors.email && errors.email.message}
                </p>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  color={Colors.Brand01}
                  className="is-left icon is-small p-1"
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={register({ required: "This field is required" })}
                  className="input"
                />
                <p className="help is-danger">
                  {errors.password && errors.password.message}
                </p>
                <FontAwesomeIcon
                  icon={faLock}
                  color={Colors.Brand01}
                  className="is-left icon is-small p-1"
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button
                  className="button is-primary is-pulled-right"
                  type="submit"
                >
                  Submit
                </button>
              </p>
            </div>
          </form>
        </div>
        <div className="column">
          <img src="/images/illustration-login.svg" />
        </div>
      </div>
    </Layout>
  );
}
