
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Card, Stack, Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DetailAssignment = () => {
    const params = useParams();
    const [topic, setTopic] = useState("");
    const [grade, setGrade] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [finished, setFinished] = useState("");
    const [point, setPoint] = useState("");

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API_URL + "assignment/" + params.id + "/" + params.idAss, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result) {
                setTopic(result.topic);
                setGrade(result.grade);
                setDescription(result.description);
                setDeadline(result.deadline);
                setFinished(result.finished);
                setPoint(result.grade);
            }
        })
        .catch(error => {
            console.log('error', error);
        })
    }, []);

    return (
        <Stack alignItems="center">
            <Box sx={{ border: "1px solid #5c5850", borderRadius:2, p:0, margin: 2  }}> 
                <Card variant="outlined" sx={{border: "1px solid #5c5850 !important"}}>
                    <CardContent sx={{ mb:0 }}>
                        <Typography gutterBottom variant="h3" color="orangered">
                            {topic}
                        </Typography>
                        <Stack direction="row">
                            <Typography gutterBottom>
                                Point: {finished? point:"--"}/{grade}
                            </Typography>
                            <Typography gutterBottom align="right" sx={{flexGrow:1}}>
                                Deadline: {deadline}
                            </Typography>
                        </Stack>
    
                        <hr/>
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                            <hr/>
                    </CardContent>
                    <CardActions sx={{mt:0, mb:1, ml:1}}>
                        <Button size="small" variant="contained" color="success">Update</Button>
                        <Button size="small" variant="contained" color="success">Delete</Button>
                        <Button size="small" variant="contained" color="success">Download grade</Button>
                        <Button size="small" variant="contained" color="success">Upload grades</Button>
                        <Button size="small" variant="contained" color="success">Donwload Template</Button>
                    </CardActions>
                </Card>
            </Box>

                    {/* <Modal show={uploadModalShow} onHide={onHandleUploadModalClose}>
            <Modal.Header closeButton>
            <Modal.Title> Upload Student List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label> File </Form.Label>
                    <Form.Control type="file" 
                            onChange={fileOnChangeHandler}/>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <div className="footer-createAssignBtn text-center">
                    <button className="btn btn-dark btnCreateAssign" onClick={uploadFile}> Upload </button>
                    <button className="btn btn-success addClassButton" onClick={onHandleUploadModalClose}> Close </button>
                </div>
            </Modal.Footer>
        </Modal> */}
        </Stack>
    )
}

export default DetailAssignment;