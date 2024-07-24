import React, { useState } from 'react'
import Dashboardlayout from '../../common/Dashboardlayout'
import Table from '../../common/table/VTable'
import SearchInput from '../../common/SearchInput'
import Addbutton from '../../common/Addbutton'
import { Link } from 'react-router-dom'
import { CircleX, NotebookPen } from 'lucide-react'
import { Tooltip } from '@mui/material'
import Popup from '../../common/Popup'
import DeletePopup from '../../common/DeletePopup'
function TipList() {
    const [isDelete, setIsDelete] = useState(false)
    const datacolumn = [
        {
            title: "Sr.No",
            dataIndex: "srno",
            key: "srno",
            width: 40,
        },
        {
            title: "Tip",
            dataIndex: "tip",
            key: "tip",
            width: 40,
        },

        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: 40,
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
                                to="/edit-tip"
                                className="p-2 bg-[#646cff1a] hover:text-[#646cff]  mr-2 rounded-[8px] button-icon"
                            > <NotebookPen />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <button onClick={() => setIsDelete(true)} className='p-2 bg-[#e0242414] text-red-800 rounded-[8px] button-icon'>
                                <CircleX />
                            </button>
                        </Tooltip>
                    </div>
                </>
            ),
            width: 40,
        },

    ]
    const data = [
        {
            srno: "01",
            tip: "Loream",
            date: '20-03-2024'
        },

    ]
    const handleDialogClose = e => {
        setIsDelete(false)
    }

    const [totalCount, setTotalCount] = useState(0);
    const [perPageItem, setPerPageItem] = useState(10);

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleRowsPerPageChange = (perPage) => {
        setPerPageItem(perPage);
        setPage(1);
    };
    return (
        <>
            <Popup open={isDelete} onDialogClose={handleDialogClose}>
                <DeletePopup
                    onClose={handleDialogClose}
                    confirmationMsg={"Are you sure you want to delete ?"}
                />
            </Popup>
            <Dashboardlayout title="Tiplist">
            <h2 className='text-3xl mb-2 text-white font-extrabold mb-6'>Tip</h2>
                <div className='flex justify-between'>
                    <SearchInput />
                    <Link to="/add-tip"><Addbutton /></Link>
                </div>
                <div>
                    <Table
                        cols={datacolumn}
                        page={[]}
                        data={data}
                        totalPages={totalCount}
                        handlePageChange={handleChange}
                        handleRowsPerPageChange={handleRowsPerPageChange}
                        isPagination={true}
                    />
                </div>
            </Dashboardlayout>
        </>
    )
}

export default TipList
