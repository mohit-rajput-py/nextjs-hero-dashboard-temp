"use client";

import * as React from "react";
import {
  Table,
  Avatar,
  Button,
  Chip,
  SearchField,
  Dropdown,
  Label,
  Pagination,
} from "@heroui/react";
import {
  Copy,
  SlidersHorizontal,
  ArrowDownUp,
  Columns3,
  MoreHorizontal,
} from "lucide-react";

interface Employee {
  id: number;
  workerId: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  workerType: string;
}

const employees: Employee[] = [
  { id: 1, workerId: "#4586936", name: "Alex Turner", email: "alex@acme.com", avatar: "https://i.pravatar.cc/150?u=alex", role: "Product Manager", workerType: "Employee" },
  { id: 2, workerId: "#4586937", name: "Emma Davis", email: "emma@acme.com", avatar: "https://i.pravatar.cc/150?u=emma", role: "Senior Designer", workerType: "Employee" },
  { id: 3, workerId: "#4586933", name: "John Smith", email: "john@acme.com", avatar: "https://i.pravatar.cc/150?u=john", role: "Chief Technology Officer", workerType: "Employee" },
  { id: 4, workerId: "#4586932", name: "Kate Moore", email: "kate@acme.com", avatar: "https://i.pravatar.cc/150?u=kate", role: "Chief Executive Officer", workerType: "Employee" },
  { id: 5, workerId: "#4586935", name: "Mike Wilson", email: "mike@acme.com", avatar: "https://i.pravatar.cc/150?u=mike", role: "VP of Engineering", workerType: "Employee" },
  { id: 6, workerId: "#4586934", name: "Sara Johnson", email: "sara@acme.com", avatar: "https://i.pravatar.cc/150?u=sara", role: "Chief Marketing Officer", workerType: "Employee" },
  { id: 7, workerId: "#4586938", name: "David Miller", email: "david@acme.com", avatar: "https://i.pravatar.cc/150?u=david", role: "QA Engineer", workerType: "Contractor" },
  { id: 8, workerId: "#4586939", name: "Sophia Martinez", email: "sophia@acme.com", avatar: "https://i.pravatar.cc/150?u=sophia", role: "Frontend Developer", workerType: "Employee" },
  { id: 9, workerId: "#4586940", name: "James Anderson", email: "james@acme.com", avatar: "https://i.pravatar.cc/150?u=james", role: "Backend Developer", workerType: "Employee" },
  { id: 10, workerId: "#4586941", name: "Olivia Thomas", email: "olivia@acme.com", avatar: "https://i.pravatar.cc/150?u=olivia", role: "HR Manager", workerType: "Employee" },
  { id: 11, workerId: "#4586942", name: "Robert Taylor", email: "robert@acme.com", avatar: "https://i.pravatar.cc/150?u=robert", role: "Data Scientist", workerType: "Employee" },
  { id: 12, workerId: "#4586943", name: "Isabella White", email: "isabella@acme.com", avatar: "https://i.pravatar.cc/150?u=isabella", role: "Product Designer", workerType: "Contractor" },
];

export function EmployeeTable() {
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;

  React.useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.workerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / itemsPerPage));
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const startItem = filteredEmployees.length === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, filteredEmployees.length);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page <= 2) {
        pages.push(2);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (page >= totalPages - 1) {
        pages.push("ellipsis");
        pages.push(totalPages - 1);
        pages.push(totalPages);
      } else {
        pages.push("ellipsis");
        pages.push(page);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-base font-semibold text-foreground">
            All Employees
          </span>
          <Chip size="sm" variant="soft">{filteredEmployees.length}</Chip>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <SearchField
            aria-label="Search employees"
            className="w-full sm:w-[220px]"
            value={searchQuery}
            onChange={handleSearchChange}
          >
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="tertiary">
              <SlidersHorizontal className="size-4" />
              Filter
            </Button>
            <Button size="sm" variant="tertiary">
              <ArrowDownUp className="size-4" />
              Sort
            </Button>
            <Button size="sm" variant="tertiary">
              <Columns3 className="size-4" />
              Columns
            </Button>
          </div>
          
        </div>
      </div>

      {/* Table */}
      <div className="w-full min-w-0 max-w-full overflow-hidden">
        <Table>
          <Table.ScrollContainer className="w-full overflow-x-auto">
            <Table.Content aria-label="All employees" className="min-w-[700px]">
            <Table.Header>
              <Table.Column isRowHeader>Worker ID</Table.Column>
              <Table.Column>Member</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Worker Type</Table.Column>
              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {paginatedEmployees.map((emp) => (
                <Table.Row key={emp.id} id={emp.id}>
                  {/* Worker ID */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium tabular-nums">
                        {emp.workerId}
                      </span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        aria-label="Copy ID"
                      >
                        <Copy className="size-3.5 text-default-400" />
                      </Button>
                    </div>
                  </Table.Cell>

                  {/* Member */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className="shrink-0">
                        <Avatar.Image src={emp.avatar} alt={emp.name} />
                        <Avatar.Fallback>
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-xs font-medium">{emp.name}</span>
                        <span className="text-xs text-default-400">
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Role */}
                  <Table.Cell>{emp.role}</Table.Cell>

                  {/* Worker Type */}
                  <Table.Cell>{emp.workerType}</Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex items-center justify-end gap-0.5 min-h-[32px]">
                      {mounted && (
                        <Dropdown>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            className="bg-transparent hover:bg-default-100"
                            aria-label="Actions"
                          >
                            <MoreHorizontal className="size-4 text-default-500" />
                          </Button>
                          <Dropdown.Popover>
                            <Dropdown.Menu aria-label="Employee actions">
                              <Dropdown.Item id="view" textValue="View details">
                                <Label>View details</Label>
                              </Dropdown.Item>
                              <Dropdown.Item id="edit" textValue="Edit employee">
                                <Label>Edit employee</Label>
                              </Dropdown.Item>
                              <Dropdown.Item id="delete" textValue="Delete employee" variant="danger">
                                <Label className="text-danger">Delete employee</Label>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown.Popover>
                        </Dropdown>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Pagination */}
      {mounted && (
        <div className="flex w-full items-center justify-between pt-1.5">
          <Pagination size="sm" className="w-full">
            <Pagination.Summary>
              Showing {startItem}-{endItem} of {filteredEmployees.length} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p as number)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages || filteredEmployees.length === 0}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
}
