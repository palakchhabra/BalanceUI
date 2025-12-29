"use client";

import { Card, Badge, DataTable, Button, Input } from "@balanceui/core";
import Link from "next/link";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

// Generate mock data
const generateMockUsers = (count: number): User[] => {
  const roles = ["Admin", "User", "Manager", "Guest"];
  const statuses = ["Active", "Inactive", "Pending"];
  const names = ["John", "Jane", "Bob", "Alice", "Charlie", "Diana", "Eve", "Frank"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `${names[i % names.length]} ${String.fromCharCode(65 + (i % 26))}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    joinDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toLocaleDateString(),
  }));
};

const allUsers = generateMockUsers(150);

export default function DataTablePage() {
  const [clientPage, setClientPage] = useState(1);
  const [clientPageSize, setClientPageSize] = useState(10);
  const [clientSort, setClientSort] = useState<{ columnId: string; direction: "asc" | "desc" } | undefined>();
  const [clientFilters, setClientFilters] = useState<Record<string, string | number | null>>({});

  const [serverPage, setServerPage] = useState(1);
  const [serverPageSize, setServerPageSize] = useState(10);
  const [serverLoading, setServerLoading] = useState(false);
  const [serverData, setServerData] = useState<User[]>([]);
  const [serverTotal, setServerTotal] = useState(150);

  // Simulate server-side data fetching
  const fetchServerData = async (page: number, pageSize: number) => {
    setServerLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = allUsers.slice(start, end);
    
    setServerData(data);
    setServerTotal(allUsers.length);
    setServerLoading(false);
  };

  // Initial server data load
  useEffect(() => {
    fetchServerData(serverPage, serverPageSize);
  }, []);

  const columns: any[] = [
    { 
      id: "name", 
      header: "Name", 
      accessor: "name" as keyof User,
      sortable: true,
    },
    { 
      id: "email", 
      header: "Email", 
      accessor: "email" as keyof User,
      sortable: true,
      filterable: true,
    },
    { 
      id: "role", 
      header: "Role", 
      accessor: "role" as keyof User,
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: [
        { label: "All", value: "" },
        { label: "Admin", value: "Admin" },
        { label: "User", value: "User" },
        { label: "Manager", value: "Manager" },
        { label: "Guest", value: "Guest" },
      ],
    },
    { 
      id: "status", 
      header: "Status", 
      accessor: "status" as keyof User,
      sortable: true,
    },
    { 
      id: "joinDate", 
      header: "Join Date", 
      accessor: "joinDate" as keyof User,
      sortable: true,
    },
  ];

  const basicColumns = columns.slice(0, 3);
  const basicData = allUsers.slice(0, 10);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:ml-64">
      <div className="mb-6 sm:mb-8">
        <Link href="/components" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          ← Back to Components
        </Link>
      </div>
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">DataTable</h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Data Display
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          Feature-rich table component with Material Design styling, sorting, filtering, pagination, and row selection.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">Examples</h2>
            
            {/* Basic Table */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Basic Table
              </h3>
              <DataTable 
                columns={basicColumns} 
                data={basicData}
                showRecordCount
              />
            </Card>

            {/* Client-Side Pagination */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Client-Side Pagination
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                All data is loaded and paginated on the client. Sorting and filtering work instantly.
              </p>
              <DataTable
                columns={columns}
                data={allUsers}
                sorting={{
                  mode: "client",
                  sort: clientSort,
                  onChange: (sort) => setClientSort(sort || undefined),
                }}
                pagination={{
                  mode: "client",
                  page: clientPage,
                  pageSize: clientPageSize,
                  onChange: (page, pageSize) => {
                    setClientPage(page);
                    setClientPageSize(pageSize);
                  },
                  showPageSizeSelector: true,
                  pageSizeOptions: [10, 20, 50, 100],
                }}
                filters={clientFilters}
                onFilterChange={setClientFilters}
                showRecordCount
                recordCountLabel="Total Users"
              />
              {/* Simple Filter UI */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Input
                  placeholder="Filter by email..."
                  value={clientFilters.email as string || ""}
                  onChange={(e) => setClientFilters({ ...clientFilters, email: e.target.value || null })}
                  style={{ minWidth: "200px", flex: "1 1 200px" }}
                />
                <Button
                  variant="stroke"
                  size="sm"
                  onClick={() => setClientFilters({})}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>

            {/* Server-Side Pagination */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Server-Side Pagination
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Data is fetched from the server on each page change. Perfect for large datasets.
              </p>
              <DataTable
                columns={columns}
                data={serverData}
                loading={serverLoading}
                pagination={{
                  mode: "server",
                  page: serverPage,
                  pageSize: serverPageSize,
                  total: serverTotal,
                  onChange: (page, pageSize) => {
                    setServerPage(page);
                    setServerPageSize(pageSize);
                    fetchServerData(page, pageSize);
                  },
                  showPageSizeSelector: true,
                  pageSizeOptions: [10, 20, 50, 100],
                }}
                showRecordCount
                recordCountLabel="Total Users"
              />
            </Card>

            {/* With Row Selection */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                With Row Selection
              </h3>
              <DataTable
                columns={basicColumns}
                data={basicData}
                selectable
                showRecordCount
                getRowId={(row) => row.id}
              />
            </Card>

            {/* Loading State */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Loading State
              </h3>
              <DataTable
                columns={columns}
                data={[]}
                loading={true}
                showRecordCount
              />
            </Card>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">Usage</h2>
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Client-Side Pagination
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { DataTable } from '@balanceui/core'
import { useState } from 'react'

function MyTable() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState()

  const columns = [
    { id: 'name', header: 'Name', accessor: 'name', sortable: true },
    { id: 'email', header: 'Email', accessor: 'email' },
  ]

  return (
    <DataTable
      columns={columns}
      data={allData}
      pagination={{
        mode: 'client',
        page,
        pageSize,
        onChange: (newPage, newPageSize) => {
          setPage(newPage)
          setPageSize(newPageSize)
        },
        showPageSizeSelector: true,
      }}
      sorting={{
        mode: 'client',
        sort,
        onChange: setSort,
      }}
    />
  )
}`}</code>
                </pre>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Server-Side Pagination
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { DataTable } from '@balanceui/core'
import { useState, useEffect } from 'react'

function MyTable() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchData = async (page, pageSize) => {
    setLoading(true)
    const response = await fetch(\`/api/users?page=\${page}&pageSize=\${pageSize}\`)
    const result = await response.json()
    setData(result.data)
    setTotal(result.total)
    setLoading(false)
  }

  useEffect(() => {
    fetchData(page, pageSize)
  }, [page, pageSize])

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      pagination={{
        mode: 'server',
        page,
        pageSize,
        total,
        onChange: (newPage, newPageSize) => {
          setPage(newPage)
          setPageSize(newPageSize)
        },
      }}
    />
  )
}`}</code>
                </pre>
              </div>
            </Card>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", position: "sticky", top: "6rem" }} className="mt-8 lg:mt-0">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white sm:text-base">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#examples" className="text-xs text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 sm:text-sm">
                  Examples
                </a>
              </li>
              <li>
                <a href="#usage" className="text-xs text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 sm:text-sm">
                  Usage
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
