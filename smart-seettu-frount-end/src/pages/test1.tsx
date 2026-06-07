const test = () => {
  return (
    <div className="fixed inset-0 bg-transparent/20 z-50 flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-xl bg-mist-700 flex flex-col gap-4 p-6 sm:p-10 md:pl-11 border rounded-3xl mx-auto">
        <label htmlFor="" className="text-4xl pt-7">
          Please Log in
        </label>
        <div className="flex flex-col gap-2">
          <label
            className="text-amber-50 text-light font-bold text-xl"
            htmlFor=""
          >
            Email
          </label>
          <input
            className="bg-amber-50 w-[90%] text-gray-950 pl-2 h-12 rounded"
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
            className="bg-amber-50 w-[90%] text-gray-950 pl-2 h-12 border rounded"
            type="password"
            placeholder="password"
          />
        </div>
        <a className="text-sky-600 text-xl" href="../frogetpassword">
          Forgot password?
        </a>
        <button
          type="button"
          className="btn btn-outline-primary bg-amber-300 h-13 w-[90%] border-b-blue-950 border-1 rounded hover:bg-amber-400 text-black font-bold"
        >
          Login
        </button>
        <button
          type="button"
          className="btn btn-outline-primary bg-transparent border-amber-400 text-amber-400 font-bold rounded border-1 h-13 w-[90%]"
        >
          Register for free
        </button>
        <span className="text-xl ">OR</span>
        <button
          type="button"
          className="btn btn-outline-primary bg-amber-300 h-13 border-b-blue-950 border-1 rounded hover:bg-amber-400 text-black font-bold w-[90%] mb-5"
        >
          Sign with google
        </button>
      </div>
    </div>
  );
};
export default test;
