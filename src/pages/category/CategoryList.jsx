import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../common/Dashboardlayout";
import Table from "../../common/table/VTable";
import SearchInput from "../../common/SearchInput";
import Addbutton from "../../common/Addbutton";
import { Link } from "react-router-dom";
import { CircleX, NotebookPen } from "lucide-react";
import { Tooltip } from "@mui/material";
import Popup from "../../common/Popup";
import DeletePopup from "../../common/DeletePopup";
import { del, get } from "../../services/ApiService";
import { toast } from "react-toastify";
import { getDateFromTimestamp } from "../../utils/getDateFromTimestamp";

function CategoryList() {
  /* DEFINE STATES AND HOOK HERE */
  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPageItem, setPerPageItem] = useState(10);

  /* 
GET API DATA
*/
  const getCategoryList = async () => {
    try {
      const response = await get(
        `getAllCategoryList?page=${page}&pageSize=${perPageItem}&search=${search}`
      );
      const responseData = response.data;
      setData(responseData);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  /* TABLE COLUMN */
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
      sortable: true,
      key: "name",
      width: 40,
    },

    {
      title: "Date",
      key: "createdAt",
      sortable: true,
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
      render: (item) => (
        <>
          <div className="flex">
            <Tooltip title="Edit">
              <Link
                to={`/edit-category/${item._id}`}
                className="p-2 bg-[#646cff1a] hover:text-[#646cff]  mr-2 rounded-[8px] button-icon"
              >
                {" "}
                <NotebookPen />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <button
                onClick={() => handleDeleteCategory(item._id)}
                className="p-2 bg-[#e0242414] text-red-800 rounded-[8px] button-icon"
              >
                <CircleX />
              </button>
            </Tooltip>
          </div>
        </>
      ),
      width: 40,
    },
  ];

  //HANDLE PAGE CHANGE
  const handlePageChange = (e, page) => {
    setPage(page);
  };

  //handleRowsPerPageChange
  const handleRowsPerPageChange = (perPage) => {
    setPerPageItem(perPage);
    setPage(1);
  };
  const handleDeleteCategory = (categoryId) => {
    setDeleteId(categoryId);
    setIsDelete(true);
  };

  //HANDLE DELETE CATEGORY
  const handleDeleteConfirm = async () => {
    try {
      const response = await del(`deleteCategory/${deleteId}`);
      toast.success(response.message);
      setIsDelete(false);
      getCategoryList();
    } catch (error) {
      console.log(error);
    }
  };

  /* 
   HANDLE DIALOG CLOSE 
  */

  const handleDialogClose = (e) => {
    setIsDelete(false);
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

  /* HANDLE API CALL */
  useEffect(() => {
    getCategoryList();
  }, [page, perPageItem, debouncedSearch]);

  return (
    <>
      <Popup open={isDelete} onDialogClose={handleDialogClose}>
        <DeletePopup
          onClose={handleDialogClose}
          onConfirm={handleDeleteConfirm}
          confirmationMsg={"Are you sure you want to delete ?"}
        />
      </Popup>
      <Dashboardlayout title="Categorylist">
        <h2 className="text-3xl mb-2 text-secondary font-extrabold">
          Category
        </h2>
        <div className="flex justify-between">
          <SearchInput setSearch={setSearch} />
          <Link to="/add-category">
            <Addbutton />
          </Link>
        </div>
        <div>
          <Table
            cols={datacolumn}
            page={page}
            data={data}
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

export default CategoryList;
