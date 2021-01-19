import React , {useEffect} from 'react';
import {useSelector , useDispatch} from "react-redux"
import {
  List,
  ListItem,
  Grid,
  Typography,
} from "@material-ui/core";
import {PostData} from "./../../methodsMe/index"
import {add_room} from "../../../../actions/Rooms"



// import pro1 from "../../../../img/profile1.jpg";
// import pro2 from "../../../../img/profile2.jpg";
// import pro3 from "../../../../img/profile3.jpg";
import avator from "../../../../img/avator/avator.jpg";


const NavListUsers = () => {

  const {name , email , room} = useSelector(state => state.auth);
  //const Rooms = useSelector(state => state.Rooms);
  const dispatch = useDispatch();



  useEffect(() => {
    
    const getRooms = async () => {
      const formData = new FormData()
      formData.append("email" , email)
      formData.append("idchat" , room)
  
      const resRoom = await PostData("/rooms" , "POST" , formData)
      return resRoom;
    }

    //console.log(getRooms())

    getRooms().then(res => {
      if(res.status === true){
        dispatch(add_room(res.data))
      }
        
    })
    

    // const id 

  } , [email , room , PostData])


  const Rooms = [
    {
      id : 1,
      name : "Asghar Ali",
      text : "salam dadash khobi ..."
    },
    {
      id : 2,
      name : "Reaz Ali",
      text : "salam dadash khobi ..."
    },
    {
      id : 3,
      name : "Ehsan Ali",
      text : "salam dadash khobi ..."
    },
  ]


    
    return (
        <Grid item className="BoxDataUserGroup" lg={3} md={4} xs={5}>
          <List style={{padding:"0px"}}>
            {
              Rooms.map((data , index) => {
                // const title = data.title
                // const pic = data.avator
                // const idchat = data.idchat
                // const room =  data.room

                const id = data.id
                const name = data.name
                const text = data.text

                const GetKey = () => {
                  console.log("idchat : " , id)
                }

                return (
                  <ListItem className="boxShowUser" button key={index}>
                    <div className="detail" onClick={GetKey}>
                      <div className="BSU BSUimg" >
                        <img src={avator} alt="photo1" />
                      </div>
                      <div className="BSU BSUtitle">
                        <Typography variant="subtitle2" gutterBottom>{name}</Typography>
                        <Typography variant="subtitle1" gutterBottom>this is message</Typography>
                      </div>
                    </div>
                  </ListItem>
                )


              })
            }
            

          </List>
        </Grid>
    )
}

export default NavListUsers;