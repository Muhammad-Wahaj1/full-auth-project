import React from 'react'
import { TaskTable } from '../../components/taskTable/TaskTable'
import { Typography } from '@mui/material'

export default function ManageTasks() {
    return (
        <>
            <Typography sx={{fontSize:'1.5rem', my:'1rem'}} align="center" variant="body2">
                Manage your tasks
            </Typography>
            <TaskTable />
        </>
    )
}
