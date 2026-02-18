import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-1">
          <Link href="/" className="flex items-center gap-0">
            <Image
              src="/logo.png"
              alt="Logo"
              title="CV Craft Logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-semibold">CVCraft</span>
          </Link>
        </div>
        <div className="mt-8 md:order-2 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CVCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
