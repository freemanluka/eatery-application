const userModel = require("../models/user");
const otpModel = require("../models/otp");
const { userSignUpMsg,  signUpOtp } = require("../utils/emails/contact");

const StatusCode = require("../utils/statusCodes");
const { generateToken, generateOTP } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const getOTP = async (req, res, next) => {
    const { email } = req.body;
 
    const OTP = await generateOTP();
    // console.log(OTP)

    await otpModel.create({
        email: email,
        code: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiresAt: Date.now() + 12 + 60 * 1000, 
    });

    /** 
     * send mail
    */
    await signUpOtp(email, OTP);

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "OTP has been sent to your email, use it to get validated!",
        // data: OTP,
    });
};

const resendOTP = async (req, res) => {
    const {email} = req.body;

    const otpExist = await otpModel.findOne({email: email});



    await otpModel.deleteMany({email:otpExist?.email});

    const OTP = await generateOTP();
    // console.log(OTP)
    await otpModel.create({
        email: email,
        code: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiration: Date.now() + 12 + 60 * 1000,
    });

    /**
     * send email
     */
    await signUpOtp(email, OTP);
    return res.status(StatusCode.OK).json({
        status: true,
        msg: "OTP resent",
    });

};



const validateOTP = async (req, res) => {
    const {email, code} = req.body;

    try {
         //Find the OTP record
    const otp = await otpModel.findOne({ code: code });
    // console.log({code, otp})
    if (!otp) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "Invalid OTP or expired. Please request a new one.",
        });
    };

    if (otp.code !== code) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "Invalid OTP. Please check the code you entered.",
        });
    };


    // if(otp == null) {
    //   return res.status(StatusCode.BAD_REQUEST).json({
    //     status: false,
    //     msg: "Invalid OTP",
    //   });
    // }

    if(otp.email !== email) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "OTP does not match the provided email address.",
        });
    }



    // Delete the OTP record after successful validation
    await otpModel.deleteOne({ code });

    

    
    return res.status(StatusCode.OK).json({
        status: true,
        msg: "OTP successfully validated",
    });

    } catch (error) {
    console.error("Error validating OTP:", error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        status: false,
        msg: "An error occurred while validating the OTP.",
    });
}

};

const signUp = async (req, res, next) => {
    const {name, email, password} = req.body;

    const userExist = await userModel.findOne({ email: email});
    
    if (userExist) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "User already exist, please login",
        });
    } else {
    }

    const salt = await bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log({hashedPassword})

    const saveUser = await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
    });

    await userSignUpMsg(email);

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "You have successfully registered your account",
        data: saveUser,
    });
};

const login = async (req, res) => {
    
    
    const {email, password} = req.body;

    console.log(email, password)//, password)

    const userExist = await userModel.findOne({ email: email})

    if (!userExist) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "User account not found, Please Sign Up",
        });
    };

    // console.log(userExist.password)

    const passwordMatches = await bcrypt.compare(password, userExist.password);

    if (!passwordMatches) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "Incorrect Password",
        });
    }



    //JWT
    const token = await generateToken(userExist);





    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "You have successfully login, Welcome to Freeds Eatery",
        data: {
            userExist,
            token
        },
    });
};

module.exports = {
    signUp,
    login,
    getOTP,
    resendOTP,
    validateOTP,
};