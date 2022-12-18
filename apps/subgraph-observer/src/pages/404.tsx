import Link from "next/link";

const NotFoundErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl font-semibold">Page not found</p>
      <Link href="/">
        <button className={"btn btn-primary"} >HOME</button>
      </Link>
    </div>
  );
};

export default NotFoundErrorPage;