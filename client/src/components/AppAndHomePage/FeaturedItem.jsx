import PropTypes from "prop-types";

import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";

import "./styles/Featured.css";

//// --- Random Unsplash Image Source --- ////
const shopImageURL = "https://source.unsplash.com/random/1000x1400/?nature,plants,trees";


//// --- Featured Item Component--- ////
// To be inserted into Featured Swiper container component.
function FeaturedItem ({item}) {

  FeaturedItem.propTypes = {
    item: PropTypes.object,
  };

  //// --- Featured Individual Item Component JSX --- ////
  return (
    <swiper-slide >
    <div className="slide-content">
      <div className="card-wrapper">
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea className="SwiperCardContainer">
            <CardMedia
              className="SwiperCardImage"
              component="img"
              image={shopImageURL}
              alt="green iguana"
            />
            <div className="Image_Overlay">
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body1" color="white">
                  ${item.price}
                </Typography>
              </CardContent>
              <CardActions style={{display:"flex", justifyContent: "center"}}>
                <Button variant="outlined" style={{color: "white", border: "2px solid white"}}>
                  Shop This
                </Button>
              </CardActions>
            </div>
          </CardActionArea>
        </Card>
      </div>
    </div>
  </swiper-slide>
  )
}

export default FeaturedItem;