"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Product } from "@/type";
import { usePaginationProduct, useProducts } from "@/hooks/useProducts";

export default function ProductTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlSearch = searchParams.get("search") || "";
  const urlPage = parseInt(searchParams.get("page") || "1");
  const urlPageSize = parseInt(searchParams.get("pageSize") || "10");

  const [search, setSearch] = useState(urlSearch);
  const [page, setPage] = useState(urlPage);
  const [pageSize, setPageSize] = useState(urlPageSize);

  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    id: true,
    name: true,
    price: true,
    stock: true,
  });

  useEffect(() => {
    setSearch(urlSearch);
    setPage(urlPage);
    setPageSize(urlPageSize);
  }, [urlSearch, urlPage, urlPageSize]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (page !== 1) params.set("page", page.toString());
      if (pageSize !== 10) params.set("pageSize", pageSize.toString());
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(handler);
  }, [search, page, pageSize, router]);

  const {data, error, isLoading } = usePaginationProduct(page, pageSize);

  const columnHelper = createColumnHelper<Product>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { header: "ID" }),
      columnHelper.accessor("title", {
        header: "Name",
        cell: (info) => (
          <a
            href={`${pathname}/${info.row.original.id}`}
            className="
              relative
              after:content-['']
              after:absolute
              after:left-0
              after:bottom-0
              after:w-0
              after:h-[2px]
              after:bg-blue-500
              after:transition-all
              after:duration-300
              hover:after:w-full
            "
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      }),
      columnHelper.accessor("stock", { header: "Stock" }),
    ],
    []
  );

  const table = useReactTable({
    data: data?.products ?? [],
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (error) return <div>Error loading products.</div>;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded"
        />

        <div className="space-x-2">
          {table.getAllLeafColumns().map((column) => (
            <label
              key={column.id}
              className="inline-flex items-center space-x-1 text-sm"
            >
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={() => column.toggleVisibility()}
              />
              <span>{column.id}</span>
            </label>
          ))}
        </div>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-3 py-1 text-left"
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : data?.products.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No products found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-1 border border-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {Math.ceil((data?.total ?? 0) / pageSize)}
        </span>

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() =>
            setPage((old) =>
              data
                ? Math.min(old + 1, Math.ceil(data.total / pageSize))
                : old + 1
            )
          }
          disabled={page === Math.ceil((data?.total ?? 0) / pageSize)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
