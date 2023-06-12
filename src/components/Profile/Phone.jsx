import React from "react";
import { useForm } from "react-hook-form";
import { gql, useQuery, useMutation } from "@apollo/client";
import { UPDATE_PHONE } from "../../gql/mutations";

const Phone = ({ phone }) => {
  const [mutatePhone, { loading: nameLoading }] = useMutation(UPDATE_PHONE);
  const uid = localStorage.getItem("id");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const changePhone = handleSubmit((data) => {
    console.log(data);
    mutatePhone({
      variables: {
        uid: uid,
        phone: data.phone,
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
        <label className="f">Phone</label>
        <div className="flex ">
          <input
            type="text"
            className={`${
              errors.phone ? "text-field-error" : "text-field-signup"
            }  `}
            placeholder={phone}
            {...register("phone", {
              required: {
                value: true,
                message: "*required",
              },
            })}
          />
          <button
            onClick={() => {
              changePhone();
            }}
            className="ml-12 update-btn"
          >
            update
          </button>
        </div>

        {errors.phone && (
          <span className="error-message">{errors.phone.message}</span>
        )}
      </div>
    </div>
  );
};

export default Phone;
