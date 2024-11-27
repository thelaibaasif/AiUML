export const ConnectWithUs = () => {
    return (
      <div className="connect-with-us">
        <h2 className="font-bold text-xl text-center">Connect with Us</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="border rounded p-2" />
          <input type="email" placeholder="Email" className="border rounded p-2" />
          <textarea placeholder="Your message" className="border rounded p-2" />
          <button type="submit" className="bg-red-500 text-white rounded p-2">
            Submit
          </button>
        </form>
      </div>
    );
  };
  