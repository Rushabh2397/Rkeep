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
import { useUser } from '../context/UserContext'
import { updateUserNote, deleteUserNote } from '../api'
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import toast from 'react-hot-toast'

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
    const { user } = useUser()
    const handleArchive = () => {
        updateArchive()
    }
    const deleteNote = async () => {
        try {
            const res = await updateUserNote({ note_id: noteObj._id, is_active: 0 });
            if (res.data.status === 'success') {
                dispatch({ type: 'DELETE', payload: noteObj._id })
                toast.success('Note moved to trash.')
            }

        } catch (error) {
            toast.error('Something went wrong plzz try again.')
        }
    }

    const deleteNotePermanently = async () => {
        try {
            const res = await deleteUserNote({ note_id: noteObj._id })
            dispatch({ type: 'DELETE', payload: noteObj._id })
            toast.success(res.data.message)

        } catch (error) {
            toast.error('Something went wrong plzz try again.')
        }
    }

    const restoreNote = async () => {
        try {
            const res = updateUserNote({ note_id: noteObj._id, is_active: 1 });
            if((await res).data.status==='success'){
                dispatch({ type: 'DELETE', payload: noteObj._id })
                toast.success('Note restored.')
            }
            
        } catch (error) {
            toast.error('Something went wrong plzz try again.')
        }
    }



    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        <Box className={classes.noteAction}>

            {/* <Tooltip key="colour" title="Change colour" arrow={true}> */}
            <div >
                {
                    (user.screen === 'Notes' || user.screen === 'Archive') && icon.palette && <span className={classes.icon} onMouseEnter={(e) => { setAnchorEl(e.currentTarget) }} onClick={(e) => { setAnchorEl(e.currentTarget) }} >

                        <PaletteOutlinedIcon />

                    </span>
                }
                {/* </Tooltip> */}
                {

                    (user.screen === 'Notes' || user.screen === 'Archive') && icon.archive && <Tooltip key="archive" title="Archive" arrow={true}>

                        <span className={classes.icon} onClick={() => { handleArchive() }}>
                            {noteObj.is_archived === 1 ? (<UnarchiveOutlinedIcon />) : <ArchiveOutlinedIcon />}
                        </span>
                    </Tooltip>
                }
                {

                    user.screen === 'Trash' && <Tooltip key="restore" title="Restore Note" arrow={true}>

                        <span className={classes.icon} onClick={restoreNote}>
                            <RestoreFromTrashOutlinedIcon fontSize="medium" />
                        </span>
                    </Tooltip>
                }
                {
                    user.screen === 'Trash' && <Tooltip key="delete" title="Delete Permanently" arrow={true}>
                        <span onClick={deleteNotePermanently}>
                            <DeleteOutlineOutlinedIcon />
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
                (user.screen === 'Notes' || user.screen === 'Archive') && icon.delete && <Tooltip key="delete" title="Delete" arrow={true}>

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