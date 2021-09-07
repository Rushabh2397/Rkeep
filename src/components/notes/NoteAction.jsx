import { Box, Tooltip } from "@material-ui/core"
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { makeStyles } from '@material-ui/core/styles';
import NoteColor from './NoteColor'
import { useRef,useState } from "react";

const useStyles = makeStyles((theme) => ({
    noteAction: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: "5px 20px"
    }

}))


const NoteAction = ({setAddNote}) => {

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const palette = useRef(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    

    return (
        <Box className={classes.noteAction}>
            {/* <Tooltip key="colour" title="Change colour" arrow={true}> */}
                <span  onMouseOver={(e)=>{setAnchorEl(e.currentTarget)}} onClick={(e)=>{setAnchorEl(e.currentTarget)}} onBlur={()=>{setAnchorEl(null)}}>

                    <PaletteOutlinedIcon />
                    <NoteColor anchorEl={anchorEl}/>
                </span>
            {/* </Tooltip> */}
            <Tooltip key="archive" title="Archive" arrow={true}>
                <span>

                    <ArchiveOutlinedIcon />
                </span>
            </Tooltip>
            <Tooltip key="cancel" title="Cancel" arrow={true}>
                <span onClick={()=>{setAddNote(false)}}>
                    <CancelOutlinedIcon />
                </span>
            </Tooltip>
        </Box>
    )
}


export default NoteAction