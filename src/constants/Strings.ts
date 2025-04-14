class Strings {
  signup_title = "Sign up";
  signup_desc = "Welcome to Pixel Boost - Let's create an account";
  login_prompt = "Already have an account?";

  login_title = "Welcome back!";
  login_desc = "Enter your username and password to continue";
  signup_prompt = "Don't have an account?";

  signup = "Sign up";
  create_account = "Create account";
  login = "Login";
  continue = "Continue";

  in_username = "Username";
  in_username_desc = "Enter your username";
  in_email = "Email";
  in_email_desc = "Enter your email";
  in_password = "Password";
  in_password_desc = "Enter your password";
  in_confirm_password = "Confirm Password";
  in_confirm_password_desc = "Confirm your password";

  warn_user = "An account with this username already exists";
  warn_user_pattern = "Username can only contain: A-z, 0-9, _, -";
  warn_email = "Please enter a valid email";
  warn_password_match = "Passwords do not match";
  warn_user_invalid = "Invalid username or password";

  required = " is required";

  get(key: string): string {
    const value = this[key as keyof this];
    return typeof value === "string" ? value : "";
  }
}

export const STR = new Strings();
