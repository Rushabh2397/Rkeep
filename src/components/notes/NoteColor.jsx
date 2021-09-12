import { Popover, Box, Tooltip } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import Color from './color.json'
import DoneIcon from '@material-ui/icons/Done';
const useStyles = makeStyles((theme) => ({
    colorDish: {
        display: "grid",
        gridTemplateColumns: "25px 25px 25px 25px",
        gridTemplateRows: "25px 25px 25px",
        padding: "6px",
        columnGap: '4px',
        rowGap: "4px"
    },
    palette: {
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        border: "1px solid black"
    }

}))



const NoteColor = ({ anchorEl,updateColor}) => {
   //console.log("anchorEl",noteObj)
    const classes = useStyles()
    const [selected,setSelected] = useState(1)

    const open = Boolean(anchorEl);
    const updateNoteColor = (id)=>{
        setSelected(id);
        updateColor(id)
    }


    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            //onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Box className={classes.colorDish}>
                {Color.map((color,index) => {
                    return <Box key={index}  onClick={()=>{   updateNoteColor(color.id)  } }>
                        <Tooltip title={color.label} key={color.name}>
                            <Box key={color.id} className={classes.palette} style={{ backgroundColor: color.color }}>
                               {selected===color.id ? <DoneIcon fontSize="small"/> :''} 
                            </Box>

                        </Tooltip>
                    </Box>

                })}

            </Box>

        </Popover>

    );
}
//setNoteObj({...noteObj,color:color.name})

export default NoteColor