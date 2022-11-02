import { ReactNode } from "react";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Made by Kris</p>
        <SocialLinks />
      </div>
    </footer>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-row space-x-4">
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost btn-sm"
      >
        <FaTwitter />
      </a>
    </div>
  );
}

export const Layout = (props: { children: ReactNode }) => {
  return (
    <div className={"max-w-full"}>
      <div className="min-h-screen heropattern-jigsaw-red-100">
        <main>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};
