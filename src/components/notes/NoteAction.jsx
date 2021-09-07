import { Box, Tooltip } from "@material-ui/core"
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    noteAction: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: "5px 20px"
    }

}))


const NoteAction = ({setAddNote}) => {

    const classes = useStyles()

    return (
        <Box className={classes.noteAction}>
            <Tooltip key="colour" title="Change colour" arrow={true}>
                <span>

                    <PaletteOutlinedIcon />

                </span>
            </Tooltip>
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