import React from "react";
import { Link as RouterLink } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import PasswordInput from "@/components/Auth/PasswordInput";
import { useAuth, useForm } from "@/hooks";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  footer: {
    display: "flex",
    justifyContent: "center",
  },
}));

function AuthForm(props) {
  const classes = useStyles();

  const { error, login, register } = useAuth();

  const [form, handleFormChanged] = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success } = props.isLogin ? await login(form) : await register(form);

    if (success) {
      props.onAuthorized();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="/logo512.png" alt="Podcast Player" />
        <Typography component="h1" variant="h5">
          {props.isLogin ? "Welcome Back." : "Create Your Account."}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            name="email"
            type="email"
            label="Email Address"
            onChange={handleFormChanged}
            value={form.email}
            error={error.length > 0}
          />

          <PasswordInput
            id="password"
            label="Password"
            value={form.password}
            onChange={handleFormChanged}
            error={error.length > 0}
            helperText={props.isLogin ? error : ""}
          />

          {!props.isLogin ? (
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={handleFormChanged}
              error={error.length > 0}
              helperText={error}
            />
          ) : null}

          <Button
            fullWidth
            disableElevation
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {props.isLogin ? "Login" : "Register"}
          </Button>

          <Grid container justifyContent="flex-end">
            {props.isLogin ? (
              <Grid item>
                <Link component={RouterLink} to="/auth/register" variant="body2" underline="hover">
                  Don't have an account? Register...
                </Link>
              </Grid>
            ) : (
              <Grid item>
                <Link component={RouterLink} to="/auth/login" variant="body2" underline="hover">
                  Already have an account? Login...
                </Link>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
      <div className={classes.footer}>
        <IconButton
          href="https://github.com/sikrewalrohit/cmpe-280-podcast-app"
          target="_blank"
          size="large"
        >
          <GitHubIcon />
        </IconButton>
      </div>
    </Container>
  );
}

export default AuthForm;
