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
import {
  usePaginationProduct,
  useSearchProduct,
  useSortProduct,
} from "@/hooks/useProducts";

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
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string>("id");

  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    id: true,
    name: true,
    price: true,
    stock: true,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (page !== 1) params.set("page", page.toString());
      if (pageSize !== 10) params.set("pageSize", pageSize.toString());
      if (sortField) params.set("sortField", sortField);
      if (sortType) params.set("sortType", sortType);
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(handler);
  }, [search, page, pageSize, sortField, sortType, router]);

  const handleSort = (field: string) => {
    setPage(1);
    if (field === sortField) {
      setSortType((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortType("asc");
    }
  };

  // pagination
  // const { data, error, isLoading } = usePaginationProduct(page, pageSize);
  // sorting
  const {
    data: sortedData,
    isLoading: isSorting,
    error: sortError,
  } = useSortProduct(sortField, page, pageSize, sortType);

  const {
    data: searchData,
    isLoading: isSearching,
    error: searchError,
  } = useSearchProduct(search);

  const displayData =
    search.trim() !== ""
      ? searchData?.products ?? []
      : sortedData?.products ?? [];

  const totalItems =
    search.trim() !== "" ? searchData?.total ?? 0 : sortedData?.total ?? 0;

  const isLoading = isSorting || isSearching;

  const isError = sortError || searchError;

  useEffect(() => {
    setPage(1);
    if (search.trim() !== "") {
      const params = new URLSearchParams();
    }
  }, [search]);

  const columnHelper = createColumnHelper<Product>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { header: "ID" }),
      columnHelper.accessor("title", {
        header: () => (
          <button
            onClick={() => handleSort("title")}
            className="flex items-center space-x-1"
          >
            <span>Name</span>
            {sortField === "title" && (
              <span>{sortType === "asc" ? "▲" : "▼"}</span>
            )}
          </button>
        ),
        cell: (info) => (
          <a
            href={`${pathname}/${info.row.original.id}`}
            className="hover:underline text-blue-600"
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("price", {
        header: () => (
          <button
            onClick={() => handleSort("price")}
            className="flex items-center space-x-1"
          >
            <span>Price</span>
            {sortField === "price" && (
              <span>{sortType === "asc" ? "▲" : "▼"}</span>
            )}
          </button>
        ),
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      }),
      columnHelper.accessor("stock", {
        header: () => (
          <button
            onClick={() => handleSort("stock")}
            className="flex items-center space-x-1"
          >
            <span>Stock</span>
            {sortField === "stock" && (
              <span>{sortType === "asc" ? "▲" : "▼"}</span>
            )}
          </button>
        ),
      }),
    ],
    [sortField, sortType]
  );

  const table = useReactTable({
    data: displayData ?? [],
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isError) return <div>Error loading products.</div>;

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
          ) : displayData.length === 0 ? (
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
          Page {page} of {Math.ceil((totalItems ?? 0) / pageSize)}
        </span>

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() =>
            setPage((old) =>
              displayData
                ? Math.min(old + 1, Math.ceil(totalItems / pageSize))
                : old + 1
            )
          }
          disabled={page === Math.ceil((totalItems ?? 0) / pageSize)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
