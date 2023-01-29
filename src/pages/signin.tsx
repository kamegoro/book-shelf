import Box from "@/components/mui/Box";
import Typography from "@/components/mui/Typography";
import Button from "@/components/mui/Button";
import TextField from "@/components/mui/TextField";

const signIn = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box sx={{ width: 500, display: "flex", flexDirection: "column" }}>
        <Typography sx={{ mb: 4, fontSize: 24 }} color="black">
          アカウント作成
        </Typography>
        <TextField sx={{ mb: 2 }} label="Name" variant="standard" />
        <TextField sx={{ mb: 2 }} label="Email" variant="standard" />
        <TextField sx={{ mb: 6 }} label="Password" variant="standard" />
        <Button variant="outlined">作成する</Button>
      </Box>
    </Box>
  );
};

export default signIn;
