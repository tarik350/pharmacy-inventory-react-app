const MessageModal = () => {
  return (
    <div>
      <div className=" w-[100px]">
        <div className="w-[100px]">
          <div className="bg-[red] w-max px-4 py-[10px] absolute top-0  rounded-tr-lg  right-0">
            x
          </div>

          <div className="w-[70%]">
            <p>are you sure you want to delete </p>
            <button>yes </button>
            <button>no</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
