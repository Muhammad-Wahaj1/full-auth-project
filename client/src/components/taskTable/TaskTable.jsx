import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css"; // Only theme CSS

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export const TaskTable = () => {
    const [rowData, setRowData] = useState([
        {
            title: "Coding",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae est laboriosam',
            status: "Pending",
            createdAt: "2025-11-19 09:00",
            updatedAt: "2025-11-19 10:00",
        },
        {
            title: "Fix API integration",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae est laboriosam',
            status: "Completed",
            createdAt: "2025-11-18 14:00",
            updatedAt: "2025-11-18 16:00",
        },
        {
            title: "Add validation for forms",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae est laboriosam',
            status: "Pending",
            createdAt: "2025-11-19 11:00",
            updatedAt: "2025-11-19 11:30",
        },
        {
            title: "Add validation for forms",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae est laboriosam',
            status: "Pending",
            createdAt: "2025-11-19 11:00",
            updatedAt: "2025-11-19 11:30",
        },
        {
            title: "Add validation for forms",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae est laboriosam',
            status: "Pending",
            createdAt: "2025-11-19 11:00",
            updatedAt: "2025-11-19 11:30",
        },
        {
            title: "Add validation for forms",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae est laboriosam',
            status: "Pending",
            createdAt: "2025-11-19 11:00",
            updatedAt: "2025-11-19 11:30",
        },
    ]);

    const [colDefs, setColDefs] = useState([
        { field: "title", headerName: "Task Title", sortable: true, filter: true },
        { field: "description", headerName: "Description", sortable: true , filter: true},
        { field: "status", headerName: "Status", sortable: true, filter: true },
        { field: "createdAt", headerName: "Created At", sortable: true },
        { field: "updatedAt", headerName: "Updated At", sortable: true },
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
    );
};
