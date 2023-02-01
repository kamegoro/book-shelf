import Box from "@/components/mui/Box";
import Button from "@/components/mui/Button";
import TextField from "@/components/mui/TextField";
import Typography from "@/components/mui/Typography";

const signIn_tmp = () =>{
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                width:'100vw',
                height:'100vh',
            }}>
            <Box
                sx={{
                    width:'45%',
                    display:'flex',
                    flexDirection:'column'
                }}>
                <Typography 
                    sx={{ mb:4, fontSize:24 }}
                    color='black'>
                サインイン
                </Typography>
                <TextField
                    sx={{mb:2}}
                    label="ログインID(メールアドレス)"
                    variant='standard'/>
                <TextField
                    sx={{mb:2}}
                    label="パスワード"
                    type="password"
                    variant="standard"/>
                <Button variant="outlined">サインインする</Button>
            </Box>
        </Box>
    );
} ;

export default signIn_tmp;