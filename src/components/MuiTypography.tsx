import { Stack, Typography, Button, IconButton } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

export const MuiTypography = () => {
  return (
    <div>
      <Typography variant="h1">h1 Heading</Typography>
      <Stack spacing={2} direction="row">
        <Button variant="text" href="www.google.com" target="blank">
          Text
        </Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <Stack spacing={2} direction="row">
        <Button variant="contained" startIcon={<SendIcon />} disableRipple onClick={()=> alert('I have clicked Holla!!')}>
          Send this
        </Button>
        <Button variant="contained" endIcon={<SendIcon />} disableElevation>
          Send
        </Button>
        <IconButton aria-label="send" size='medium'><SendIcon/></IconButton>
      </Stack>
    </div>
  );
}