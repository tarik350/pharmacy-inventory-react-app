import React from "react";
import { useForm } from "react-hook-form";
import { gql, useQuery, useMutation } from "@apollo/client";
import { UPDATE_PNAME } from "../../gql/mutations";

const PharmacyName = ({ pname }) => {
  const [mutatePname, { loading: nameLoading }] = useMutation(UPDATE_PNAME);
  const uid = localStorage.getItem("id");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const changePname = handleSubmit((data) => {
    console.log(data);
    mutatePname({
      variables: {
        uid: uid,
        pname: data.pname,
      },
    })
      .then((value) => {
        console.log("=-=-=-=-=-");
        console.log("success");
        console.log(value);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("=-=-=-=-=-");
        console.log(err.message);
      });
  });

  return (
    <div>
      <div className="mb-4">
        <label className="f">Pharmacy Name</label>
        <div className="flex ">
          <input
            type="text"
            className={`${
              errors.pname ? "text-field-error" : "text-field-signup"
            }  `}
            placeholder={pname}
            {...register("pname", {
              required: {
                value: true,
                message: "*required",
              },
            })}
          />
          <button
            onClick={() => {
              changePname();
            }}
            className="ml-12 update-btn"
          >
            update
          </button>
        </div>

        {errors.pname && (
          <span className="error-message">{errors.pname.message}</span>
        )}
      </div>
    </div>
  );
};

export default PharmacyName;
