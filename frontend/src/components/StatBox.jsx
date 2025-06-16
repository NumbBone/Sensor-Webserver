import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../themes";


const StatBox = ({ title, subtitle, icon}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" >
      <Box display="flex" justifyContent="center">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;