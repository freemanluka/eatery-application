const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE } = require("../../config/envConfig");


exports.contactUsMsg = async (email, first_name) => {

    try {
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            secure: true,
            auth: {
                pass: PASSMAILER,
                user: USER,
            },
        });

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: "Thanks for contacting us Freeds Eatery",
            html: `<b> Greetings </b> <br/>
                <p>
                We've received your mail
                </p>
                
                </br>
                <b>
                
                <p>Best regards,</p>
                <p>PEACE!</p>
                </b>
                `,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

exports.userSignUpMsg = async (email, first_name) => {

    try {
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            secure: true,
            auth: {
                pass: PASSMAILER,
                user: USER,
            },
        });

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: "Freeds Eatery Account Registration",
            html: `<b> Greetings </b> <br/>
                <p>
                You registered your account on Freeds eatery
                </p>
                
                </br>
                <b>
                
                <p>Best regards,</p>
                <p>Freeds Eatery!</p>
                </b>
                `,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};


exports.signUpOtp = async (email, OTP) => {
    console.log(email, PASSMAILER);
    try {
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            secure: true,
            auth: {
                pass: PASSMAILER,
                user: USER,
            },
        });

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: "OTP for Freeds Eatery",
            html: `<b> Hi there </b> <br/>
                <p>
                Copy and use the OTP to verify yourself ${OTP}
                </p>
                
                </br>
                <b>
                
                <p>Best regards,</p>
                <p>Freeds Eatery!</p>
                </b>
                `,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};


exports.dishMenuMsg = async (email) => {

    try {
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            secure: true,
            auth: {
                pass: PASSMAILER,
                user: USER,
            },
        });

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: "ORDER RECEIVED",
            html: `<b> Hi there! </b> <br/>
                <p>
                We've received your order and your dish is on the way
                </p>
                
                </br>
                <b>
                
                <p>Thanks for patronizing us,</p>
                <p>Freeds Eatery</p>
                </b>
                `,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};
