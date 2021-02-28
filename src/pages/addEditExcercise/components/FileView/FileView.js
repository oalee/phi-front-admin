
import { Paper } from '@material-ui/core'
import React from 'react'
import { useDrag } from 'react-dnd'

/**
 * Your Component
 */

export default function FileView({ fileName, status, img, url, order }) {


    return (
        <Paper elevation={4} style={{ width: 300, height: 100, border: "solid", borderRadius: 4, borderWidth: 2 }}>
            {fileName}
        </Paper>
    )
}