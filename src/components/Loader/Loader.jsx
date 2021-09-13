import Loader from "react-loader-spinner";
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
   loader:{
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 999,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
   },
   hide:{
      display:"none"
   }


}))



const Loaderr = ({ visible }) => {
    const classes = useStyles();
    return (
        <div className={visible ? classes.loader : classes.hide}>
        
            <Loader
                type="Oval"
                color="#00BFFF"
                height={80}
                width={80}
                visible={visible}
            />
        </div>
    );
}


export default Loaderr