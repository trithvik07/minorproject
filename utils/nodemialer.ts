import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "trithvikprince@gmail.com",
    pass: "utickdkenfwhhwlw",
  },
});

transport.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MAILER CONNECTION VERIFIED");
  }
});

export default transport;
