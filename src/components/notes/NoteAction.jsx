import { Box, Tooltip } from "@material-ui/core"
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import NoteColor from './NoteColor'
import { useState } from "react";
import { useNote } from '../context/NoteContext'
import { updateUserNote } from '../api'

const useStyles = makeStyles((theme) => ({
    noteAction: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: "5px 10px"
    },
    icon: {
        marginRight: "15px"
    }

}))


const NoteAction = ({ setAddNote, icon, setNoteObj, noteObj, setOpen, updateColor, updateArchive }) => {

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const { dispatch } = useNote()
    const handleArchive = () => {
        updateArchive()
    }
    const deleteNote = async () => {
        try {
            const res = await updateUserNote({ note_id: noteObj._id,is_active:0 });
            dispatch({ type: 'DELETE', payload: noteObj._id })
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleClose = ()=>{
        setAnchorEl(null)
    }


    return (
        <Box className={classes.noteAction}>

            {/* <Tooltip key="colour" title="Change colour" arrow={true}> */}
            <div >
                {
                    icon.palette && <span className={classes.icon} onMouseEnter={(e) => { setAnchorEl(e.currentTarget) }} onClick={(e) => { setAnchorEl(e.currentTarget) }} >

                        <PaletteOutlinedIcon />

                    </span>
                }
                {/* </Tooltip> */}
                {

                    icon.archive && <Tooltip key="archive" title="Archive" arrow={true}>

                        <span className={classes.icon} onClick={() => { handleArchive() }}>
                            {noteObj.is_archived === 1 ? (<UnarchiveOutlinedIcon />) : <ArchiveOutlinedIcon />}
                        </span>
                    </Tooltip>
                }


            </div>
            {
                icon.cancel && <Tooltip key="cancel" title="Cancel" arrow={true}>
                    <span onClick={() => { setAddNote(false) }}>
                        <CancelOutlinedIcon />
                    </span>
                </Tooltip>
            }
            {
                icon.close && <Tooltip key="close" title="close" arrow={true}>
                    <span style={{ cursor: "pointer" }} onClick={() => { setOpen(false) }}>
                        Close
                    </span>
                </Tooltip>
            }
            {
                icon.delete && <Tooltip key="delete" title="Delete" arrow={true}>

                    <span className={classes.icon} onClick={deleteNote}>
                        <DeleteOutlineOutlinedIcon />
                    </span>
                </Tooltip>
            }
            <NoteColor anchorEl={anchorEl} updateColor={updateColor} handleClose={handleClose} />
        </Box>
    )
}


export default NoteAction