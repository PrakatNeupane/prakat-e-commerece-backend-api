import nodemailer from 'nodemailer'

export const sendMail = async (emailData) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP,
        port: +process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Laptop store 👻" <juwan.aufderhar72@ethereal.email>', // sender address
        to: "juwan.aufderhar72@ethereal.email", // list of receivers
        subject: "Pleae verify your email ", // Subject line
        text: `hi there, please follow the linke to verify your email ${emailData.url}`, // plain text body
        html: `
    <p>Hi ${emailData.fName}</P>
    <br/>
    <br/>
    Pelase follow the linke below to veryfy your email, so tha you can login to your account.
    <br/>
    <br/>
    <a href = "${emailData.url}">${emailData.url}</a>
    
    <br/>
    <br/>

    Kind regards,
    Lapotar store team
    `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}