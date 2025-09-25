## Research Activity: Why SSL?

SSL/TLS secures or encrypts data between the internet browser and websites to keep it secure. HTTPS is just regular HTTP with SSL protection added. Without SSL, hackers can easily steal the data inside the website because it will just be sending important information in plain text. Ericsson's mobile network infrastructure, in December 2018 was affected by a widespread outage when a digital certificate used to secure their SGSN-MME infrastructure expired. SSL is essential and without it, user data will be read instead of it being encrypted.


## Reflection:

Adding didn't do anything wrong to my application, but I had to make sure the backend and frontend were using the certificate and key files. I ran into some problems trusting the certificate on my Windows VM, and my browser kept showing warnings, which was kind of frustrating. I ended up just trusting the certificate on the browser directly. I wouldn’t use a self-signed certificate for production. I’d get one from a trusted authority so users wouldn’t see warnings, and make sure the server is set up properly for HTTPS.