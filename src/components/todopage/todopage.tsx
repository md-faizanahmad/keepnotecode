import * as React from "react";
import "./todopage.css";
import { styled, alpha, useTheme } from "@mui/material/styles";
import keepLogo from "../../../src/assets/keep-icon.png";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Drawer,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Dns as DnsIcon,
  Settings,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

// Drawer width and styling
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export function TodoPage() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [cookies, setCookie, removeCookie] = useCookies([
    "Fname",
    "Lname",
    "Email",
  ]);
  const [userDetails, setUserDetails] = React.useState<any>(null);
  const navigate = useNavigate();

  // Toggle Drawer Open/Close
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user: any) => {
      const docRef = doc(db, "Users", user.uid);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        setUserDetails(docData.data());
      } else {
        console.error("User not Logged In");
      }
    });
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <img src={keepLogo} alt="Keep" /> Keep
          </Typography>
          {/* Rest of your Toolbar code here */}
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <Divider />
        <List>
          {["Home", "Refresh", "List View", "Settings"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? (
                  <HomeIcon />
                ) : index === 1 ? (
                  <RefreshIcon />
                ) : index === 2 ? (
                  <DnsIcon />
                ) : (
                  <Settings />
                )}
              </ListItemIcon>
              {open && <ListItemText primary={text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        {/* Place your main content here */}
      </Main>
    </Box>
  );
}
