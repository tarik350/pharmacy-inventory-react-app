import React from "react";
import { useForm } from "react-hook-form";
import { gql, useQuery, useMutation } from "@apollo/client";
import { UPDATE_NAME } from "../../gql/mutations";
import { data } from "autoprefixer";
import { useState } from "react";

const Name = ({ name }) => {
  const [mutateName, { loading: nameLoading }] = useMutation(UPDATE_NAME);
  const uid = localStorage.getItem("id");
  const [updated, setUpdated] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const changeName = handleSubmit((data) => {
    console.log(data);
    mutateName({
      variables: {
        uid: uid,
        name: data.name,
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
        <label className="f">Full Name</label>
        <div className="flex ">
          <input
            type="text"
            className={`${
              errors.name ? "text-field-error" : "text-field-signup"
            }  `}
            placeholder={name}
            {...register("name", {
              required: {
                value: true,
                message: "*required",
              },
            })}
          />
          <button
            onClick={() => {
              changeName();
            }}
            className="ml-12 update-btn"
          >
            update
          </button>
        </div>

        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>
    </div>
  );
};

export default Name;
