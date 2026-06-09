const login = () => {
  return (
    <div
      className="fixed inset-0 bg-transparent/20 z-50 flex items-center justify-center "
      onClick={closeLoginFromBackground}
    >
      <div
        className="w-full lg:h-[60vh] sm:w-[80vw] sm:h-[70vh] md:h-[70vh] max-w-md md:max-w-xl bg-cyan-950 flex flex-col gap-1 p-6 sm:p-10 md:pl-11 border rounded-3xl mx-auto w-25px h-[50vh] mt-10 mb-10 ml-5 mr-5"
        onClick={(e) => e.stopPropagation()}
      >
        <label htmlFor="" className=" sm:text-4xl md:text-4xl pt-1 sm:p:7">
          Please Login
        </label>
        <div className="flex flex-col gap-2">
          <label
            className="text-amber-50 text-light font-bold text-xl"
            htmlFor=""
          >
            Email
          </label>
          <input
            className="bg-amber-50 w-[90%] text-gray-950 pl-2 h-[6vh] rounded"
            type="email"
            placeholder=" email"
            part="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-amber-50 text-light font-bold text-xl"
            htmlFor=""
          >
            Password
          </label>
          <input
            className="bg-amber-50 w-[90%] text-gray-950 pl-2  h-[6vh] border rounded"
            type="password"
            placeholder="password"
          />
        </div>
        <a className="text-sky-600 text-xl" href="#">
          Forgot password?
        </a>
        <button
          type="button"
          className="btn btn-outline-primary bg-amber-300  h-[6vh] w-[90%] border-b-blue-950 border-1 rounded hover:bg-amber-400 text-black font-bold"
        >
          Login
        </button>
        <button
          type="button"
          className="btn btn-outline-primary bg-transparent border-amber-400 text-amber-400 font-bold rounded border-1  h-[6vh] w-[90%]"
          onClick={registerHadaer}
        >
          Register for free
        </button>{" "}
        {/* <span className="text-xl  h-[6vh] w-[90%] flex items-center justify-center ">
                  <h1>OR</h1>
                </span> */}
        {/* <button
                  type="button"
                  className="btn btn-outline-primary bg-amber-300  h-[6vh] border-b-blue-950 border-1 rounded hover:bg-amber-400 text-black font-bold w-[90%] mb-5"
                >
                  Sign with google
                </button> */}
      </div>
    </div>
  );
};

export default login;
