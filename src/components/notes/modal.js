
import { Box, Popover } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none'
    },
    paper: {
        padding: theme.spacing(1),
    },
    colorDish:{
      display:'flex',
      flexWrap:'wrap',
      width:"100px"
    },
    colorPalette: {
        width: "20px",
        marginLeft:"4px",
        marginBottom:"4px",
        height: "20px",
        borderRadius: "50%"
    }
}));
const Modal = ({ anchorEl, setAnchorEl }) => {
    const classes = useStyles();
    const open = Boolean(anchorEl);
    
    const color  =['#f28b82','#fbbc04','#fff475','#ccff90','#cbf0f8','#cbf0f8','#d7aefb','#fdcfe8','#e6c9a8','#e8eaed']
    return (
        <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
                paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            // onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <Box className={classes.colorDish}>
                {color.map((colour,index)=>{
                    return <Box key={index} className={classes.colorPalette} style={{background:colour}}></Box>
                })}

            </Box>

        </Popover>
    )
}


export default Modal