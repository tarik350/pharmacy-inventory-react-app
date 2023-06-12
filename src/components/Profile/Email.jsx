import React from "react";
import { useForm } from "react-hook-form";
import { gql, useQuery, useMutation } from "@apollo/client";
import { UPDATE_EMAIL } from "../../gql/mutations";

const Email = ({ email }) => {
  const [mutateEmail, { loading: nameLoading }] = useMutation(UPDATE_EMAIL);
  const uid = localStorage.getItem("id");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const changeEmail = handleSubmit((data) => {
    console.log(data);
    mutateEmail({
      variables: {
        uid: uid,
        email: data.email,
      },
    })
      .then((value) => {
        window.location.reload(false);
        console.log("=-=-=-=-=-");
        console.log("success");
        console.log(value);
      })
      .catch((err) => {
        console.log("=-=-=-=-=-");
        console.log(err.message);
      });
  });

  return (
    <div>
      <div className="mb-4">
        <label className="f">Email</label>
        <div className="flex ">
          <input
            type="text"
            className={`${
              errors.email ? "text-field-error" : "text-field-signup"
            }  `}
            placeholder={email}
            {...register("email", {
              required: {
                value: true,
                message: "*required",
              },
            })}
          />
          <button
            onClick={() => {
              changeEmail();
            }}
            className="ml-12 update-btn"
          >
            update
          </button>
        </div>

        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>
    </div>
  );
};

export default Email;
