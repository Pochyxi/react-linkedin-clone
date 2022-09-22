import { Button, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import FeedIcon from '@mui/icons-material/Feed';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BarChartIcon from '@mui/icons-material/BarChart';


export default function FormDialogPost({ fetchPosts }) {
    const token = useSelector(state => state.user.token)
    const user = useSelector(state => state.user.user)
    const [open, setOpen] = useState(false);
    const [formObj, setFormObj] = useState({
        text: '',
    })


    const addPost = async (obj) => {
        const baseEndpoint = "https://striveschool-api.herokuapp.com/api/posts/"

        const header = {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await fetch(baseEndpoint, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: header,
            });
            if (response.ok) {
                const data = await response.json();
                setFormObj({
                    text: '',
                })
                fetchPosts()
                console.log(data);
            } else {
                alert("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleForm = (key, value) => {
        setFormObj(form => {
            return {
                ...form,
                [key]: value
            }

        })
    }
    const formValidation = () => {
        let validation = false
        if (formObj.text.length > 0) {
            validation = true
        }
        return validation
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                variant="outline-secondary"
                className="buttonPost"
            >
                Avvia un Post
            </Button>
            <Dialog fullWidth={"lg"} open={open} onClose={handleClose}>
                <Col className="d-flex justify-content-between align-items-center">
                    <DialogTitle>Crea un post</DialogTitle>
                    <Button
                        className="buttonDialogPost"
                        variant="outline-secondary "
                        onClick={handleClose}
                    >
                        X
                    </Button>
                </Col>
                <hr />
                <DialogContent>
                    <Col xs={12} className="d-flex justify-content-start">
                        <img className="NavbarUserList" src={user.image} alt="" />
                        <div className="mb-3 ">
                            <h6>
                                {user.name} {user.surname}
                            </h6>
                            <Button className="CardAziendaButton" variant="outline-secondary">
                                Chiunque
                            </Button>
                        </div>
                    </Col>
                    <TextField
                        autoFocus
                        className="mt-3"
                        id="outlined-multiline-flexible"
                        label="Di cosa vorresti parlare"
                        multiline
                        rows={5}
                        value={formObj.text}
                        onChange={(e) => {
                            handleForm("text", e.target.value);
                        }}
                        fullWidth
                        variant="standard"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Col xs={10} className="d-flex justify-content-around">
                        <ImageOutlinedIcon sx={{ color: '#86888A' }} />
                        <SmartDisplayIcon sx={{ color: '#86888A' }} />
                        <FeedIcon sx={{ color: '#86888A' }} />
                        <BusinessCenterIcon sx={{ color: '#86888A' }} />
                        <WorkspacePremiumIcon sx={{ color: '#86888A' }} />
                        <BarChartIcon sx={{ color: '#86888A' }} />
                    </Col>
                    <Col xs={2} >
                        <Button
                            className="CardPostButton"
                            variant="outline-secondary"
                            onClick={() => {
                                if (formValidation() === true) {
                                    handleClose();
                                    addPost(formObj);
                                }
                            }}
                        >
                            Pubblica
                        </Button>
                    </Col>
                </DialogActions>
            </Dialog>
        </>

    );
}
