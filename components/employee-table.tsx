"use client";

import {
  Table,
  Avatar,
  Button,
  Chip,
  SearchField,
  Dropdown,
  Label,
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
  {
    id: 1,
    workerId: "#4586936",
    name: "Alex Turner",
    email: "alex@acme.com",
    avatar: "https://i.pravatar.cc/150?u=alex",
    role: "Product Manager",
    workerType: "Employee",
  },
  {
    id: 2,
    workerId: "#4586937",
    name: "Emma Davis",
    email: "emma@acme.com",
    avatar: "https://i.pravatar.cc/150?u=emma",
    role: "Senior Designer",
    workerType: "Employee",
  },
  {
    id: 3,
    workerId: "#4586933",
    name: "John Smith",
    email: "john@acme.com",
    avatar: "https://i.pravatar.cc/150?u=john",
    role: "Chief Technology Officer",
    workerType: "Employee",
  },
  {
    id: 4,
    workerId: "#4586932",
    name: "Kate Moore",
    email: "kate@acme.com",
    avatar: "https://i.pravatar.cc/150?u=kate",
    role: "Chief Executive Officer",
    workerType: "Employee",
  },
  {
    id: 5,
    workerId: "#4586935",
    name: "Mike Wilson",
    email: "mike@acme.com",
    avatar: "https://i.pravatar.cc/150?u=mike",
    role: "VP of Engineering",
    workerType: "Employee",
  },
  {
    id: 6,
    workerId: "#4586934",
    name: "Sara Johnson",
    email: "sara@acme.com",
    avatar: "https://i.pravatar.cc/150?u=sara",
    role: "Chief Marketing Officer",
    workerType: "Employee",
  },
];

export function EmployeeTable() {
  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-base font-semibold text-foreground">
            All Employees
          </span>
          <Chip size="sm" variant="soft">32</Chip>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <SearchField
            aria-label="Search employees"
            className="w-full sm:w-[220px]"
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
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="All employees" className="min-w-[700px]">
            <Table.Header>
              <Table.Column isRowHeader>Worker ID</Table.Column>
              <Table.Column>Member</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Worker Type</Table.Column>
              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {employees.map((emp) => (
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
                    <div className="flex items-center justify-end gap-0.5">
                      <Dropdown>
                        <Dropdown.Trigger>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            aria-label="Actions"
                          >
                            <MoreHorizontal className="size-4 text-default-500" />
                          </Button>
                        </Dropdown.Trigger>
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
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
