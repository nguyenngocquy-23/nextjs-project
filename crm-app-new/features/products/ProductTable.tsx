"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Product } from "@/type";
import {
  useDeleteProduct,
  useSearchProduct,
  useSortProduct,
} from "@/hooks/useProducts";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import clsx from "clsx";
import { useAddToCart } from "@/hooks/useCart";

import { Button } from "@/components/ui/button";
import { AlertDialogDemo } from "@/components/AlertDialog";
import { useTranslations } from "next-intl";

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

  const tProduct = useTranslations("Product");
  const tToast = useTranslations("Toast-product");

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

  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = (productId: number) => {
    const product = {
      id: productId,
      title: "Sample Product",
      price: 100,
      quantity: 1,
      total: 100,
      discountPercentage: 10,
      discountedPrice: 90,
      thumbnail: "https://example.com/image.jpg",
    };
    addToCart([product], {
      onSuccess: () => {
        toast.success("Product deleted successfully!");
      },
    });
  };
  // const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = () => {
    if (deleteId === null) return;
    deleteProduct(deleteId, {
      onSuccess: () => {
        toast.success(tToast("delete-product", { id: deleteId }));
        setDeleteId(null);
        const newList = listProducts.filter((item) => item.id !== deleteId);
        setListProducts(newList);
      },
      onError: () => {
        toast.error(tToast("error"));
      },
    });
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

  useEffect(() => {
    if (displayData.length > 0 && listProducts.length === 0) {
      setListProducts(displayData);
    }
  }, [displayData]);

  const [listProducts, setListProducts] = useState<Product[]>([]);
  // console.log("listProducts", listProducts);

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
      columnHelper.accessor("id", { header: tProduct("th-id") }),
      columnHelper.accessor("title", {
        header: () => (
          <button
            onClick={() => handleSort("title")}
            className="flex items-center space-x-1"
          >
            <span>{tProduct("th-title")}</span>
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
            <span>{tProduct("th-price")}</span>
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
            <span>{tProduct("th-stock")}</span>
            {sortField === "stock" && (
              <span>{sortType === "asc" ? "▲" : "▼"}</span>
            )}
          </button>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: tProduct("th-actions"),
        meta: { className: "w-[100px] text-center" },
        cell: ({ row }) => {
          const product = row.original; // object Product hiện tại
          return (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleAddToCart(product.id)}
                className="px-2 py-1 text-sm text-green-500 rounded hover:text-green-600"
              >
                <Plus />
              </button>
              <button
                onClick={() => setDeleteId(product.id)}
                className="px-2 py-1 text-sm text-red-500 rounded hover:text-red-600"
              >
                <Trash />
              </button>
            </div>
          );
        },
      }),
    ],
    [sortField, sortType, pathname]
  );

  const table = useReactTable({
    data: listProducts ?? [],
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
          placeholder={`${tProduct("search")}...`}
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
              <span>{tProduct(`th-` + column.id)}</span>
            </label>
          ))}
          <button
            className="bg-black text-white px-3 py-1 rounded-md"
            onClick={() => router.push(`products/add`)}
          >
            {tProduct("add")}
          </button>
        </div>
      </div>

      <AlertDialogDemo
        mainAction="Continue"
        showDialog={deleteId !== null}
        setShowDialog={(id) => {
          if (!id) setDeleteId(null);
          else setDeleteId(deleteId);
        }}
        titleAlert="Are you sure?"
        descriptionAlert="This action cannot be undone. This will permanently delete the product."
        handleContinue={() => handleDelete()}
      >
        <Button variant="destructive" onClick={() => setDeleteId(null)}>
          No
        </Button>
        <Button variant="default" onClick={() => handleDelete()}>
          Yes
        </Button>
      </AlertDialogDemo>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as {
                  className?: string;
                };
                return (
                  <th
                    key={header.id}
                    className={clsx(
                      "border border-gray-300 px-3 py-1 text-left text-sm font-medium",
                      meta?.className // ✅ lấy class riêng cho từng cột (nếu có)
                    )}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                {tProduct("loading")}
              </td>
            </tr>
          ) : listProducts.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                {tProduct("no-data")}
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
          {tProduct("previous")}
        </button>

        <span>
          {tProduct("page")} {page} {tProduct("of")}{" "}
          {Math.ceil((totalItems ?? 0) / pageSize)}
        </span>

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() =>
            setPage((old) =>
              listProducts
                ? Math.min(old + 1, Math.ceil(totalItems / pageSize))
                : old + 1
            )
          }
          disabled={page === Math.ceil((totalItems ?? 0) / pageSize)}
        >
          {tProduct("next")}
        </button>
      </div>
    </div>
  );
}
