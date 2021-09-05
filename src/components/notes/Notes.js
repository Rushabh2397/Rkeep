import { Box, Toolbar, TextField } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Modal from './modal'
import { useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: "column"
    },
    notesContainer: {
        display: "flex",
        marginLeft: theme.spacing(8) + 1,
        paddingTop: theme.spacing(3)
    },
    notes: {
        margin: '0 auto'
    },
    noteCard: {
        position: 'relative',
        width: '225px',
        border: "1px solid black",
        borderRadius: "3px"
    },
    title: {

    },
    notepad: {
        // paddingLeft: "5px",
        // paddingTop: "5px",
        overflow: "hidden",
        padding: "10px",
        border: "none",
        '&:focus': {
            outline: "none !important"
        }

    },
    InputProps: {
        paddingLeft: "10px"
    },
    action: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "10px"

    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },

}));

const Notes = () => {
    const classes = useStyles();
    const palette = useRef(null)
    const [anchorEl, setAnchorEl]  = useState(null);
    const handlePopoverOpen = () => {
        setAnchorEl(palette.current);
        
    }
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const modal = ()=>{
        return <Modal anchorEl={anchorEl} setAnchorEl ={setAnchorEl}  />
    }
    const InputProps = {
        className: classes.InputProps
    }

    return (
        <div >
            <Toolbar />
            <div className={classes.notesContainer}>
                <Box className={classes.notes} >
                    {/* <TextField size="small" variant="outlined" placeholder="Take a note... " fullWidth /> */}
                    <Box className={`${classes.row} ${classes.noteCard}`}>
                        <TextField className={classes.title} size="small" placeholder="Title" InputProps={InputProps} />
                        <TextareaAutosize className={classes.notepad} placeholder="Take a note..." scrolling={"false"} />
                        <Box className={classes.action}>
                            <PaletteOutlinedIcon ref={palette} onMouseOver={ handlePopoverOpen} />
                             {anchorEl!==null ? modal():''}
                            <ArchiveOutlinedIcon />
                            <DeleteOutlineOutlinedIcon />
                            <CancelOutlinedIcon />
                        </Box>
                    </Box>

                </Box>
            </div>
        </div>
    )
}

//onMouseLeave={handlePopoverClose}
export default Notes

