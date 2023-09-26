import React from "react";
import Pagination from "./Pagination";
import Table from "./Table";
import Search from "./Search";
import axios from "axios";
import { useState, useEffect } from "react";
import "./admin.css";

const AdminUI = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationUsers, setPaginationUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUsers(res.data);
      setFilterUsers(res.data);
    } catch (error) {
      console.error("Error happened while fetching AdminUI user data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    setSelectedRow([]);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    const maxItems = 10;
    const allPagesCount = Math.ceil(filterUsers.length / maxItems);
    const startIdx = (currentPage - 1) * maxItems;
    const endIdx = startIdx + maxItems;
    const paginationUsers =
      filterUsers.length > 0
        ? filterUsers.slice(startIdx, endIdx)
        : filterUsers;

    setTotalPages(allPagesCount);
    setPaginationUsers(paginationUsers);
  }, [filterUsers, currentPage]);

  const handleSearch = (event) => {
    const searchBar = event.target.value.toLowerCase();
    setSearchBar(searchBar);

    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchBar) ||
        user.email.toLowerCase().includes(searchBar) ||
        user.role.toLowerCase().includes(searchBar)
    );
    setFilterUsers(filteredUsers);
    setCurrentPage(1);
  };

  const handleRowSelect = (event, user) => {
    const selected = event.target.checked;
    if (selected) {
      setSelectedRow((prevLine) => [...prevLine, user]);
    } else {
      setSelectedRow((prevLine) =>
        prevLine.filter((selectedRow) => selectedRow.id !== user.id)
      );
    }
  };

  const handleSelectAll = (event) => {
    const selected = event.target.checked;
    if (selected) {
      setSelectedRow([...paginationUsers]);
    } else {
      setSelectedRow([]);
    }
  };

  const handleDeleteSelected = () => {
    const leftUsers = filterUsers.filter(
      (user) => !selectedRow.includes(user)
    );
    setUsers(leftUsers);
    setFilterUsers(leftUsers);
    setSelectedRow([]);
    if (currentPage > 1 && leftUsers.length <= (currentPage - 1) * 10) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditUser = (editedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
    setFilterUsers(updatedUsers);
  };

  const handleDeleteUser = (user) => {
    const leftUsers = filterUsers.filter((u) => u.id !== user.id);
    setUsers(leftUsers);
    setFilterUsers(leftUsers);
    setSelectedRow((prevLine) =>
      prevLine.filter((selectedRow) => selectedRow.id !== user.id)
    );
    if (currentPage > 1 && leftUsers.length <= (currentPage - 1) * 10) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Admin-UI</h1>
      <Search searchBar={searchBar} handleSearch={handleSearch} />

      <Table
        users={paginationUsers}
        selectedRow={selectedRow}
        handleRowSelect={handleRowSelect}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
        handleSelectAll={handleSelectAll}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleDeleteSelected={handleDeleteSelected}
        setCurrentPage={setCurrentPage}
        selectedRow={selectedRow}
        handleSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default AdminUI;
