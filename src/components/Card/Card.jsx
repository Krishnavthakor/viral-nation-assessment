import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import styles from './Card.module.css';

export default function CardComponent(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    avatarUri,
    actions,
    title,
    subTitle,
    description,
    isVerified,
    profileData,
  } = props;

  const handleAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    setAnchorEl(null);
    action.handleAction(profileData);
  };

  const getTitle = () => {
    return (
      <div className={styles.title}>
        <div className={styles.innerContainer}>{title}</div>
        {isVerified && (
          <div>
            <VerifiedIcon fontSize="24" color="primary" />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {avatarUri}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleAction}>
            <MoreVertIcon />
          </IconButton>
        }
        title={getTitle()}
        subheader={subTitle}
      />
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {actions.map((action) => (
          <MenuItem onClick={() => handleClose(action)}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
