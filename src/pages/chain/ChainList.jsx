import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../common/Dashboardlayout";
import Table from "../../common/table/VTable";
import SearchInput from "../../common/SearchInput";
import Addbutton from "../../common/Addbutton";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { CircleX, NotebookPen } from "lucide-react";
import Popup from "../../common/Popup";
import DeletePopup from "../../common/DeletePopup";
import { del, get } from "../../services/ApiService";
import { toast } from "react-toastify";

function ChainList() {
  /* DEFINE STATES AND HOOK HERE */

  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPageItem, setPerPageItem] = useState(10);

  /* GET DATA FROM API */
  const getChainList = async () => {
    try {
      const response = await get(
        `getAllChainsList?page=${page}&pageSize=${perPageItem}&search=${search}`
      );
      setData(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

/* COLUMN FOR TABLE DEFINE HERE */
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
      title: "Image",
      key: "image",
      width: 40,
      render: (item) => (
        <img
          src={item.image}
          className="w-20 h-20 rounded-full"
          alt="chain"
        />
      ),
    },
    {
      title: "Chain Id",
      dataIndex: "chainId",
      key: "chainId",
      width: 40,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 40,
    },
    {
      title: "Currency",
      dataIndex: "symbol",
      key: "symbol",
      width: 40,
    },
    {
      title: "isBlock",
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
      render: (item, text) => (
        <div className="flex">
          <Tooltip title="Edit">
            <Link
              to={`/edit-chain/${item._id}`}
              className="p-2 bg-[#646cff1a] hover:text-[#646cff] mr-2 rounded-[8px] button-icon"
            >
              <NotebookPen />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <button
              onClick={() => handleDeleteChain(item._id)}
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
  const handleDeleteChain = (chainId) => {
    setDeleteId(chainId);
    setIsDelete(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await del(`deleteChain/${deleteId}`);
      setIsDelete(false);
      getChainList();
      toast.success(result.message);
    } catch (error) {
      console.log(error);
      setIsDelete(false);
    }
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

  useEffect(() => {
    getChainList();
  }, [page, perPageItem,debouncedSearch]);

  return (
    <>
      <Popup open={isDelete} onDialogClose={handleDialogClose}>
        <DeletePopup
          onClose={handleDialogClose}
          onConfirm={handleDeleteConfirm}
          confirmationMsg={"Are you sure you want to delete ?"}
        />
      </Popup>
      <Dashboardlayout title="Chainlist">
        <h2 className="text-3xl text-secondary font-extrabold mb-2">Chain</h2>
        <div className="flex justify-between">
          <SearchInput  setSearch={setSearch}/>
          <Link to="/add-chain">
            <Addbutton />
          </Link>
        </div>
        <div>
          {data.length > 0 ? (
            <Table
              cols={datacolumn}
              data={data}
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              handleRowsPerPageChange={handleRowsPerPageChange}
              isPagination={true}
            />
          ) : (
            <p>No data available</p>
          )}
        </div>
      </Dashboardlayout>
    </>
  );
}

export default ChainList;
