## Research 

JWT is like a digital ID card that remembers who you are after logging in. It shows your identity and permissions without checking the database every time. It’s made of three parts combined into a code your browser sends with requests. Without SSL, hackers could steal it and pretend to be you. A real example is a vulnerability where JWT tokens were exposed in URLs with users’ email and password in plain text. Hackers could grab these tokens from browser history or logs and take over accounts without needing the password, showing how dangerous insecure JWT handling can be.

