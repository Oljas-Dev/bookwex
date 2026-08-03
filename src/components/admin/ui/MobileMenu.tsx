import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function MobileMenu() {
  const navigate = useNavigate();

  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path: string) => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <div className="min-[800px]:hidden">
      <Button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
      >
        <ThreeDotsVertical size={18} />
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": buttonId,
          },
        }}
      >
        <MenuItem onClick={() => handleClose("/admin/teachers")}>
          teachers
        </MenuItem>
        <MenuItem onClick={() => handleClose("/admin/feedback")}>
          feedback
        </MenuItem>
      </Menu>
    </div>
  );
}
