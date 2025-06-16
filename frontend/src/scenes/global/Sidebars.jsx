import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton,Typography ,useTheme} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../themes";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import Co2OutlinedIcon from '@mui/icons-material/Co2Outlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
            icon={icon}
            component={<Link to={to} />}
        >
        <Typography>{title}</Typography>
        
      </MenuItem>
    );
  };


const Sidebars = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    
    return (
        <Box
        sx={{
            "& .ps-sidebar-container": {
                background: `${colors.primary[400]} !important`,
                height: "200vh !important"
              },
              "& .ps-menu-button": {
                padding: "5px 35px 5px 20px !important", 
              },
              "& .ps-menu-button:hover": {
                color: "#868dfb !important", 
              },
              "& .ps-menu-button.ps-active": {
                color: "#6870fa !important", 
              },
              "& .ps-menu-icon": {
                backgroundColor: "transparent !important",
              },        
    
        }}
    >
        <Sidebar collapsed={isCollapsed} >
            <Menu iconshape="square">

                <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined} 
                        style={{
                            margin: "10px 0 20px 0", color: colors.grey[100]
                        }}>
                        {!isCollapsed && (
                            <Box display={"flex"} justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>PANEL</Typography>
                                <IconButton>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                </MenuItem>
                    {!isCollapsed && (
                        <Box>
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginBottom="25px">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/user.jpg`}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign={"center"}>
                                <Typography variant="h2" color={colors.grey[100]} fontWeight={"bold"} sx={{m: "10px 0 0 0"}}>Denis Miri</Typography>
                                <Typography variant="h5" color={colors.greenAccent[500] }>Admin</Typography>
                            </Box>
                        </Box>
                    )}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Humididty"
                            to="/HumData"
                            icon={<WaterDropOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="TVOC"
                            to="/TVOC"
                            icon={<AirOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="eCO2"
                            to="/eCO2"
                            icon={<Co2OutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Table"
                            to="/sensTable"
                            icon={<BackupTableOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                    
            </Menu>
        </Sidebar>
    </Box>);
};

export default Sidebars;