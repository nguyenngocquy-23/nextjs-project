// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    const parts = pathname.split("/");
    if (Number(parts[parts.length - 1])) {
      return (parts[parts.length - 2] || "") == path;
    } else {
      return (parts[parts.length - 1] || "") == path;
    }
  };

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className={`block px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 ${
            isActive("dashboard")
              ? "bg-black hover:bg-black text-white hover:cursor-default pointer-events-none"
              : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/products"
          className={`block px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 ${
            isActive("products")
              ? "bg-black hover:bg-black text-white hover:cursor-default pointer-events-none"
              : ""
          }`}
        >
          Products
        </Link>
        {/* Add more links */}
      </nav>
    </aside>
  );
}

//ver responsive on mobile
// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   const isActive = (path: string) => pathname.includes(path);

//   return (
//     <aside className="border-r dark:border-gray-700 bg-gray-100 dark:bg-gray-900 md:w-64 w-full md:block fixed md:relative z-50">
//       {/* Toggle on mobile */}
//       <div className="md:hidden flex justify-between items-center p-3 border-b dark:border-gray-700">
//         <span className="font-semibold">Menu</span>
//         <button
//           onClick={() => setOpen(!open)}
//           className="text-sm px-2 py-1 border rounded"
//         >
//           {open ? "Close" : "Open"}
//         </button>
//       </div>

//       {/* Nav links */}
//       <nav
//         className={`space-y-2 p-4 md:block ${
//           open ? "block" : "hidden"
//         } md:!block transition-all`}
//       >
//         <Link
//           href="/dashboard"
//           className={`block px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
//             isActive("dashboard")
//               ? "bg-blue-600 text-white pointer-events-none"
//               : ""
//           }`}
//         >
//           Dashboard
//         </Link>
//         <Link
//           href="/dashboard/products"
//           className={`block px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
//             isActive("products")
//               ? "bg-blue-600 text-white pointer-events-none"
//               : ""
//           }`}
//         >
//           Products
//         </Link>
//       </nav>
//     </aside>
//   );
// }
