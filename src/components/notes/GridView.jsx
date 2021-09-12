import Masonry from 'react-masonry-css'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from "@material-ui/core"
import GridViewSub from './GridViewSub'
import { useState, useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    myMasonryGrid: {
        display: "-webkit-box",
        display: "-ms-flexbox",
        display: "flex",
        width: "auto",
        padding: "0 8.5rem",
        //justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            padding: "0 1.5rem"
        },
        [theme.breakpoints.down('md')]: {
            padding: "0 2.2rem",
            marginLeft:"8px"
        },
    },
    myMasonryGridColumn: {
        backgroundClip: "padding-box"
    },
    noteDisplay: {
        marginLeft: theme.spacing(8),
        paddingTop: theme.spacing(5),
    },
}))


const GridView = ({ notz, updateNotes }) => {
    const classes = useStyles();
    const [breakPoints, setBreakPoints] = useState(5);
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.up("xs")); //375 //1
    const sm = useMediaQuery(theme.breakpoints.up("sm")); //600 //2
    const md = useMediaQuery(theme.breakpoints.up("md")); //960 //3
    const lg = useMediaQuery(theme.breakpoints.up("lg")); //1280 //4
    const xl = useMediaQuery(theme.breakpoints.up("xl")); //1920 //5
    function setPageBreakPoints() {
        if (xl) {
            setBreakPoints(5);
        } else if (lg) {
            setBreakPoints(4);
        } else if (md) {
            setBreakPoints(3);
        } else if (sm) {
            setBreakPoints(2);
        } else if (xs) {
            setBreakPoints(1);
        }
    }

    useEffect(() => {
        setPageBreakPoints();
    });

    return (
        <Masonry
            breakpointCols={breakPoints}
            className={classes.myMasonryGrid}
            columnClassName={classes.myMasonryGridColumn}
        >
            {
                notz.map(note => {
                    return <GridViewSub notz={note} updateNotes={updateNotes} />
                })
            }
        </Masonry>

    )
}

export default GridView