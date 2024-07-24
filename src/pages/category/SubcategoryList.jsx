import React, { useState, useEffect } from "react";
import Dashboardlayout from "../../common/Dashboardlayout";
import Table from "../../common/table/VTable";
import SearchInput from "../../common/SearchInput";
import Addbutton from "../../common/Addbutton";
import { Link } from "react-router-dom";
import { CircleX, NotebookPen } from "lucide-react";
import { Tooltip } from "@mui/material";
import Popup from "../../common/Popup";
import DeletePopup from "../../common/DeletePopup";
import { get, del } from "../../services/ApiService";
import { getDateFromTimestamp } from "../../utils/getDateFromTimestamp";
import { toast } from "react-toastify";

function SubcategoryList() {
  /* define states and hooks here */
  const [subcategories, setSubcategories] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPageItem, setPerPageItem] = useState(10);

  /* fetch data from api */
  const fetchSubcategories = async () => {
    try {
      const response = await get(
        `getAllSubCategoryList?page=${page}&pageSize=${perPageItem}&search=${search}`
      );
      setSubcategories(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  /* define column here */
  const datacolumn = [
    {
      title: "Sr.No",
      dataIndex: "srno",
      key: "srno",
      width: 40,
      render: (item, index) => (
        <>{page * perPageItem - perPageItem + index + 1}</>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 40,
    },
    {
      title: "Category",
      key: "categoryId",
      width: 40,
      render: (item) => <>{item?.categoryId?.name || "---"}</>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 40,
      render: (item) => getDateFromTimestamp(item.createdAt),
    },
    {
        title: "status",
        dataIndex: "status",
        key: "status",
        width: 40,
        render: (item) => (
          <>
            {item.status ? (
              <div class="card-badge inactive">
                <span>Blocked</span>
              </div>
            ) : (
              <div class="card-badge  ">
                <span>Unblocked</span>
              </div>
            )}
          </>
        ),
      },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (record, index) => (
        <div className="flex">
          <Tooltip title="Edit">
            <Link
              to={`/edit-subcategory/${record._id}`}
              className="p-2 bg-[#646cff1a] hover:text-[#646cff] mr-2 rounded-[8px] button-icon"
            >
              <NotebookPen />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <button
              onClick={() => {
                handleDeleteSubCategory(record._id);
              }}
              className="p-2 bg-[#e0242414] text-red-800 rounded-[8px] button-icon"
            >
              <CircleX />
            </button>
          </Tooltip>
        </div>
      ),
      width: 40,
    },
  ];

  const handleDeleteSubCategory = (categoryId) => {
    setDeleteId(categoryId);
    setIsDelete(true);
  };

  /* handle delete function */
  const handleDelete = async () => {
    try {
      const result = await del(`deleteSubCategory/${deleteId}`);
      setIsDelete(false);
      fetchSubcategories(); // Refresh the list after deletion
      toast.success(result.message);
    } catch (error) {
      setIsDelete(false);
      console.error("Error deleting subcategory:", error);
    }
  };

  /* hnadle dialog close  */
  const handleDialogClose = () => {
    setIsDelete(false);
  };

  //HANDLE PAGE CHANGE
  const handlePageChange = (e, page) => {
    setPage(page);
  };

  //handleRowsPerPageChange
  const handleRowsPerPageChange = (perPage) => {
    setPerPageItem(perPage);
    setPage(1);
  };

  // Update debouncedSearch when search changes after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay, adjust as necessary

    // Cleanup function to cancel the timeout if search changes again before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  /* fetch first load */
  useEffect(() => {
    fetchSubcategories();
  }, [page, perPageItem, debouncedSearch]);

  return (
    <>
      <Popup open={isDelete} onDialogClose={handleDialogClose}>
        <DeletePopup
          onClose={handleDialogClose}
          confirmationMsg={"Are you sure you want to delete this subcategory?"}
          onConfirm={handleDelete}
        />
      </Popup>
      <Dashboardlayout title="Subcategory">
        <h2 className="text-3xl mb-2 text-secondary font-extrabold">
          Sub Category
        </h2>
        <div className="flex justify-between">
          <SearchInput setSearch={setSearch} />
          <Link to="/add-subcategory">
            <Addbutton />
          </Link>
        </div>
        <div>
          <Table
            cols={datacolumn}
            page={page}
            data={subcategories}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            isPagination={true}
          />
        </div>
      </Dashboardlayout>
    </>
  );
}

export default SubcategoryList;
