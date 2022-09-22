import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LongMenuPost from "./LongMenuPost";

const LinkedinPost = ({ post, fetchPosts }) => {
  const [expanded, setExpanded] = React.useState(false);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const dateCorrect = (string) => {
    let date = new Date(string);
    return date.toLocaleDateString(undefined, options).split(' ').slice(2, 4).join(' ')
  }

  return (
    <>
      {post.user && (
        <Card className="mb-3">
          <CardHeader
            avatar={
              <Avatar >
                <img className="PostUser" src={post.user.image} alt="user" />
              </Avatar>
            }
            action={
              <LongMenuPost post={post} fetchPosts={fetchPosts} />
            }
            title={post.user.username + ' - ' + post.user.title}
            subheader={dateCorrect(post.updatedAt)}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{post.user.email}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
};

export default LinkedinPost;
