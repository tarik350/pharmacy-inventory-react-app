import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { BiSupport } from "react-icons/bi";
import emailjs from "@emailjs/browser";

const Support = () => {
  const descriptionRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState("");
  const [flag, setFlag] = useState("");

  const sendEmail = (data) => {
    const description = descriptionRef.current.getContent({ format: "text" });

    setLoading(true);

    emailjs
      .send(
        "service_ssru8r4",
        "template_kiy7951",
        {
          to_name: "To Samaritan",
          from_name: data.name.toUpperCase(),
          from_email: data.email,
          message: description,
        },
        "yLCQoB4SpBWYgQxA6"
      )
      .then(
        () => {
          setLoading(false);
          setFlag("success");
          setmessage("Thank you. I will get back to you as soon as possible.");
          // alert("Thank you. I will get back to you as soon as possible.");
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setFlag("error");
          setmessage("Ahh, something went wrong. Please try again.");

          // alert("Ahh, something went wrong. Please try again.");
        }
      )
      .catch((e) => {
        alert("there was an error" + e);
      });
  };

  const handleEmail = handleSubmit((data) => {
    sendEmail(data);
  });
  return (
    <div className="flex justify-center">
      <div className="flex mx-[40px] justify-center items-center h-screen w-[1000px]  ">
        <div className="flex flex-1  rounded-xl  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
          <div className=" flex-col relative  bg-white w-full   m-[3px] border-2 p-12 shadow-2xl rounded-lg   ">
            <div className=" flex flex-col mx-[100px] ">
              <div className="flex ">
                <h1 className="heading-one mb-12 uppercase">Support</h1>
                <div className="absolute top-[7%] right-[43%]">
                  <BiSupport size={40} color="purple" />
                </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  {/* <label className="">Pharmacy Name*</label> */}
                  <input
                    type="text"
                    // className="text-field-signup"
                    className={`${
                      errors.pharmacyName
                        ? "text-field-error"
                        : "text-field-signup"
                    } `}
                    placeholder="your name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "*required",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name.message}</span>
                  )}
                </div>
                <div className="mb-4">
                  {/* <label className="">Pharmacy Name*</label> */}
                  <input
                    type="text"
                    // className="text-field-signup"
                    className={`${
                      errors.pharmacyName
                        ? "text-field-error"
                        : "text-field-signup"
                    } `}
                    placeholder="your email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "*required",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="error-message">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                {/* <p>your complient</p> */}
                {/* if you can change this lable to a place holder on the editor */}
                <div className=" pt-4 pb-[3px]">
                  <lable className="heading-four ">your complient</lable>
                </div>
                <Editor
                  apiKey="utllbsqr2qw8jfn1o7uj4rijs3puf8wd44tmv0ndfwsoyr5o"
                  // ref={descriptionRef}
                  onInit={(evt, editor) => (descriptionRef.current = editor)}
                  // outputFormat="text"
                  // initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],

                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    // toolbar: false,

                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px z-index:0 }",
                  }}
                  onEditorChange={onchange}
                />
                <div
                  className={`${flag === "error" && "text-red-600 "} ${
                    flag === "success" && "text-green-600"
                  } text-black font-bold text-[18px] py-4 `}
                >
                  {loading ? "sending" : message}
                </div>
                <button
                  className={` w-full my-12 group  uppercase py-[20px] rounded-xl flex-1  text-white  hover:bg-white hover:border-[1px] shadow-2xl hover:border-black  bg-black transition-all ease-in-out  duration-75 delay-75 `}
                  title="Login"
                  onClick={() => {
                    handleEmail();
                  }}
                >
                  <p className="group-hover:bg-gradient-to-r  group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:inline-block group-hover:text-transparent group-hover:bg-clip-text transition-all duration-75 delay-75 ">
                    send
                  </p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
