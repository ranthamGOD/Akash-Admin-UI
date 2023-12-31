import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faTrash,
  faCircleCheck,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./table.css";

const Table = ({
  users,
  selectedRow,
  handleRowSelect,
  handleEditUser,
  handleDeleteUser,
  handleSelectAll,
}) => {
  const [editIt, setEditIt] = useState(null);

  const AllSelect = selectedRow.length === users.length;

  const handleEditing = (user) => {
    setEditIt(user);
  };

  const handleSave = () => {
    handleEditUser(editIt);
    setEditIt(null);
  };

  const handleCancel = () => {
    setEditIt(null);
  };

  const handleInputChange = (event, space) => {
    setEditIt((prevUser) => ({
      ...prevUser,
      [space]: event.target.value,
    }));
  };

  const rowSelected = (user) => selectedRow.includes(user);

  return (
    <div className="table-div">
      <table className="user-tab">
        <thead>
          <tr>
            <th>
              <input
                className="check"
                type="checkbox"
                checked={AllSelect}
                onChange={handleSelectAll}
              />
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={rowSelected(user) ? "selected-line" : ""}
            >
              <td>
                <input
                  className="check"
                  type="checkbox"
                  checked={rowSelected(user)}
                  onChange={(event) => handleRowSelect(event, user)}
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {editIt && editIt.id === user.id ? (
                  <input
                    type="text"
                    value={editIt.name}
                    onChange={(event) => handleInputChange(event, "name")}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editIt && editIt.id === user.id ? (
                  <input
                    type="text"
                    value={editIt.email}
                    onChange={(event) => handleInputChange(event, "email")}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editIt && editIt.id === user.id ? (
                  <input
                    type="text"
                    value={editIt.role}
                    onChange={(event) => handleInputChange(event, "role")}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="actions">
                {editIt && editIt.id === user.id ? (
                  <>
                    <button onClick={handleSave}>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{ color: "#50b7f7" }}
                      />
                    </button>
                    <button onClick={handleCancel}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        style={{ color: "#f91706" }}
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <button style={{ cursor: 'pointer' }} onClick={() => handleEditing(user)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteUser(user)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#ff0000" }}
                      />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;