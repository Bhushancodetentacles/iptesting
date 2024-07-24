import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../common/Dashboardlayout";
import Table from "../../common/table/VTable";
import { Link } from "react-router-dom";
import SearchInput from "../../common/SearchInput";
import Addbutton from "../../common/Addbutton";
import { CircleX, NotebookPen } from "lucide-react";
import { Tooltip } from "@mui/material";
import DeletePopup from "../../common/DeletePopup";
import Popup from "../../common/Popup";
import { del, get } from "../../services/ApiService";
import { getDateFromTimestamp } from "../../utils/getDateFromTimestamp";
import { toast } from "react-toastify";

function ProjectList() {
	const [isDelete, setIsDelete] = useState(false);
	const [projectList, setProjectList] = useState([]);
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState(search);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [perPageItem, setPerPageItem] = useState(10);
	const [deleteId, setDeleteId] = useState(null);

	const fetchProjectList = async () => {
		try {
			const response = await get(
				`getAllProjectList?page=${page}&pageSize=${perPageItem}&search=${search}`
			);
			setProjectList(response.data); // Update state with project list data
			setTotalPages(response.totalPages);
		} catch (error) {
			console.error("Error fetching project list:", error);
		}
	};

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
			title: "Logo",
			dataIndex: "Logo",
			key: "Logo",
			width: 40,
			render: (item) => (
				<img src={item.image} className="w-20 h-20 rounded-full" />
			),
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			width: 40,
		},
		{
			title: "Short Description",
			dataIndex: "shortDiscription",
			key: "shortDiscription",
			width: 40,
		},
		{
			title: "Date",
			dataIndex: "Date",
			key: "Date",
			width: 40,
			render: (item) => getDateFromTimestamp(item.createdAt),
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
								to={`/edit-project/${item._id}`}
								className="p-2 bg-[#646cff1a] hover:text-[#646cff]  mr-2 rounded-[8px] button-icon"
							>
								{" "}
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
				</>
			),
			width: 40,
		},
	];

	const handleDialogClose = (e) => {
		setIsDelete(false);
	};

	const handleDeleteChain = (pid) => {
		setDeleteId(pid);
		setIsDelete(true);
	};

	const handleDeleteConfirm = async () => {
		try {
			const result = await del(`deleteProject/${deleteId}`);
			setIsDelete(false);
			fetchProjectList();
			toast.success(result.message);
		} catch (error) {
			console.log(error);
			setIsDelete(false);
		}
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

	/* HANDLE API CALL */
	useEffect(() => {
		fetchProjectList();
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
			<Dashboardlayout title="Projectlist">
				<h2 className="text-3xl mb-2 text-white font-extrabold mb-6">
					Project
				</h2>
				<div className="flex justify-between">
					<SearchInput setSearch={setSearch} />
					<Link to="/add-project">
						<Addbutton />
					</Link>
				</div>
				<div>
					<Table
						cols={datacolumn}
						page={page}
						data={projectList}
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

export default ProjectList;
